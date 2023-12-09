import { Prisma, Store } from "@prisma/client";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { IGenericResponse } from "../../../interfaces/common";
import { IPaginationOptions } from "../../../interfaces/pagination";
import prisma from "../../../shared/prisma";
import { IStoreFilterRequest } from "./store.interface";
import { StoreSearchableFields } from "./store.constant";

const createOne = async (data: Store): Promise<Store | null> => {
    const result = await prisma.store.create({ data });
    return result;
}

const getAll = async (filters: IStoreFilterRequest, options: IPaginationOptions): Promise<IGenericResponse<Store[]>> => {
    const { limit, page, skip } = paginationHelpers.calculatePagination(options);
    const { searchTerm, ...filterData } = filters;
    const andConditions = [];

    if (searchTerm) {
        andConditions.push({
            OR: StoreSearchableFields.map(field => ({
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

    const whereConditions: Prisma.StoreWhereInput = andConditions.length > 0 ? { AND: andConditions } : {}

    const result = await prisma.store.findMany({
        where: whereConditions,
        skip,
        take: limit,
        orderBy: options.sortBy && options.sortOrder
            ? { [options.sortBy]: options.sortOrder }
            : {
                createdAt: 'desc'
            },
    })
    const total = await prisma.store.count({
        where: whereConditions
    })


    return {
        meta: { total, page, limit },
        data: result
    }
}

const getOne = async (id: string): Promise<Store | null> => {
    const result = await prisma.store.findUnique({
        where: { id }
    })
    console.log(result);
    return result;
}

const updateOne = async (id: string, payload: Partial<Store>): Promise<Store> => {

    const result = await prisma.store.update({
        where: { id },
        data: payload
    })
    return result
}

const deleteOne = async (id: string): Promise<Store> => {
    const result = await prisma.store.delete({
        where: { id }
    });
    return result;
}

export const StoreService = { createOne, getAll, getOne, updateOne, deleteOne }