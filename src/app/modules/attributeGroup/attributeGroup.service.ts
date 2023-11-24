import { AttributeGroup, Prisma } from "@prisma/client";
import prisma from "../../../shared/prisma";
import { IAttributeGroupFilterRequest } from "./attributeGroup.interface";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { IGenericResponse } from "../../../interfaces/common";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { AttributeGroupSearchableFields } from "./attributeGroup.constant";

const createOne = async (data: AttributeGroup): Promise<AttributeGroup | null> => {
    const result = await prisma.attributeGroup.create({ data });
    return result;
}

const getAll = async (filters: IAttributeGroupFilterRequest, options: IPaginationOptions): Promise<IGenericResponse<AttributeGroup[]>> => {
    const { limit, page, skip } = paginationHelpers.calculatePagination(options);
    const { searchTerm, ...filterData } = filters;
    const andConditions = [];

    if (searchTerm) {
        andConditions.push({
            OR: AttributeGroupSearchableFields.map(field => ({
                [field]: {
                    contains: searchTerm,
                    mode: 'insensitive'
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

    const whereConditions: Prisma.AttributeGroupWhereInput = andConditions.length > 0 ? { AND: andConditions } : {}

    const result = await prisma.attributeGroup.findMany({
        where: whereConditions,
        skip,
        take: limit,
        orderBy: options.sortBy && options.sortOrder
            ? { [options.sortBy]: options.sortOrder }
            : {
                created_at: 'desc'
            }
    })
    const total = await prisma.attributeGroup.count({
        where: whereConditions
    })


    return {
        meta: { total, page, limit },
        data: result
    }
}

const getOne = async (id: string): Promise<AttributeGroup | null> => {
    const result = await prisma.attributeGroup.findUnique({
        where: { id }
    })
    return result;
}

const updateOne = async (id: string, payload: Partial<AttributeGroup>): Promise<AttributeGroup> => {

    const result = await prisma.attributeGroup.update({
        where: { id },
        data: payload
    })
    return result
}

const deleteOne = async (id: string): Promise<AttributeGroup> => {
    const result = await prisma.attributeGroup.delete({
        where: { id }
    });
    return result;
}

export const AttributeGroupService = { createOne, getAll, getOne, updateOne, deleteOne }