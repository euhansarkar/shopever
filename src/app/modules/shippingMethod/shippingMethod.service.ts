import { ShippingMethod, Prisma } from "@prisma/client";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { IGenericResponse } from "../../../interfaces/common";
import { IPaginationOptions } from "../../../interfaces/pagination";
import prisma from "../../../shared/prisma";
import { IShippingMethodFilterRequest } from "./shippingMethod.interface";
import { ShippingMethodSearchableFields } from "./shippingMethod.constant";

const createOne = async (data: ShippingMethod): Promise<ShippingMethod | null> => {
    const result = await prisma.shippingMethod.create({ data });
    return result;
}

const getAll = async (filters: IShippingMethodFilterRequest, options: IPaginationOptions): Promise<IGenericResponse<ShippingMethod[]>> => {
    const { limit, page, skip } = paginationHelpers.calculatePagination(options);
    const { searchTerm, ...filterData } = filters;
    const andConditions = [];

    if (searchTerm) {
        andConditions.push({
            OR: ShippingMethodSearchableFields.map(field => ({
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

    const whereConditions: Prisma.ShippingMethodWhereInput = andConditions.length > 0 ? { AND: andConditions } : {}

    const result = await prisma.shippingMethod.findMany({
        where: whereConditions,
        skip,
        take: limit,
        orderBy: options.sortBy && options.sortOrder
            ? { [options.sortBy]: options.sortOrder }
            : {
                created_at: 'desc'
            }
    })
    const total = await prisma.shippingMethod.count({
        where: whereConditions
    })


    return {
        meta: { total, page, limit },
        data: result
    }
}

const getOne = async (id: string): Promise<ShippingMethod | null> => {
    const result = await prisma.shippingMethod.findUnique({
        where: { id }
    })
    return result;
}

const updateOne = async (id: string, payload: Partial<ShippingMethod>): Promise<ShippingMethod> => {

    const result = await prisma.shippingMethod.update({
        where: { id },
        data: payload
    })
    return result
}

const deleteOne = async (id: string): Promise<ShippingMethod> => {
    const result = await prisma.shippingMethod.delete({
        where: { id }
    });
    return result;
}

export const ShippingMethodService = { createOne, getAll, getOne, updateOne, deleteOne }