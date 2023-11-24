import { Attribute, AttributeOption, Prisma } from "@prisma/client";
import prisma from "../../../shared/prisma";
import { IAttributeFilterRequest } from "./attribute.interface";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { AttributeSearchableFields } from "./attribute.constant";
import { IGenericResponse } from "../../../interfaces/common";
import { asyncForEach } from "../../../shared/utils";

const createOne = async (attributeData: Attribute
    , attribute_options: Array<any>
): Promise<Attribute | null> => {

    const attCreation = await prisma.$transaction(async (transectionClient) => {
        const attResult = await transectionClient.attribute.create({ data: attributeData });

        for (const attOption of attribute_options) {
            const data = { attribute_id: attResult.id, ...attOption }
            const myRes = await transectionClient.attributeOption.create({ data });
        }
        return attResult;

    })

    const result = await prisma.attribute.findUnique({ where: { id: attCreation.id }, include: { attribute_options: true } });

    return result;
}

const getAll = async (filters: IAttributeFilterRequest, options: IPaginationOptions): Promise<IGenericResponse<Attribute[]>> => {

    const { limit, page, skip } = paginationHelpers.calculatePagination(options);
    const { searchTerm, ...filterData } = filters;

    const andConditions = [];

    if (searchTerm) {
        andConditions.push({
            OR: AttributeSearchableFields.map(field => ({
                [field]: {
                    contains: searchTerm,
                    mode: "insensitive"
                }
            }))
        })
    }

    if (Object.keys(filterData).length > 0) {
        andConditions.push({
            AND: Object.keys(filterData).map(key => ({
                [key]: {
                    equals: (filterData as any)[key]
                }
            }))
        })
    }

    const whereConditions: Prisma.AttributeWhereInput = andConditions.length > 0 ? { AND: andConditions } : {}

    const result = await prisma.attribute.findMany({
        where: whereConditions,
        skip,
        take: limit,
        include: { attribute_options: true },
        orderBy:
            options.sortBy && options.sortOrder
                ? { [options.sortBy]: options.sortOrder }
                : {
                    created_at: "desc"
                }
    });
    const total = await prisma.attribute.count({
        where: whereConditions,
    });

    return {
        meta: {
            total,
            page,
            limit
        },
        data: result
    }
}

const getOne = async (id: string): Promise<Attribute | null> => {
    const result = await prisma.attribute.findUnique({
        where: {
            id
        },
        include: { attribute_options: true }
    })
    return result
}


const updateOne = async (id: string, attributeData: Partial<Attribute>, attribute_options: AttributeOption[] | null): Promise<Attribute | null> => {

    const result = await prisma.$transaction(async (transectionClient) => {
        
        const attResult = await transectionClient.attribute.update({ where: { id }, data: attributeData });

        if (attribute_options && attribute_options.length > 0) {
           
            const deleteOptions = attribute_options.filter(option => option.option_text && option.is_deleted);

            const newOptions = attribute_options.filter(option => option.option_text && !option.is_deleted);

            await asyncForEach(deleteOptions, async (option: AttributeOption) => {
                await transectionClient.attributeOption.deleteMany({ where: { attribute_id: option.attribute_id } })
            })

            await asyncForEach(newOptions, async (option: AttributeOption) => {
                await transectionClient.attributeOption.create({
                    data: {  ...option, attribute_id: attResult.id }
                })
            })
        }
        
        return attResult;
    })

    const get = await prisma.attribute.findUnique({ where: { id: result.id }, include: { attribute_options: true } });

    return get;
}

const deleteOne = async (id: string): Promise<Attribute | null> => {
    const result = await prisma.$transaction(async (transectionClient) => {

        await transectionClient.attributeOption.deleteMany({ where: { attribute_id: id } });

        const result = await transectionClient.attribute.delete({ where: { id }, include: { attribute_options: true } });

        return result;

    })

    return result
}


export const AttributeService = { createOne, getAll, getOne, deleteOne, updateOne }