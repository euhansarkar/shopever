import { Prisma, Collection } from "@prisma/client";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { IGenericResponse } from "../../../interfaces/common";
import { IPaginationOptions } from "../../../interfaces/pagination";
import prisma from "../../../shared/prisma";
import { CollectionSearchableFields } from "./collection.constant";
import { ICollectionFilterRequest } from "./collection.interface";

const createOne = async (data: Collection): Promise<Collection | null> => {
    const result = await prisma.collection.create({ data });
    return result;
}

const getAll = async (filters: ICollectionFilterRequest, options: IPaginationOptions): Promise<IGenericResponse<Collection[]>> => {
    const { limit, page, skip } = paginationHelpers.calculatePagination(options);
    const { searchTerm, ...filterData } = filters;
    const andConditions = [];

    if (searchTerm) {
        andConditions.push({
            OR: CollectionSearchableFields.map(field => ({
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

    const whereConditions: Prisma.CollectionWhereInput = andConditions.length > 0 ? { AND: andConditions } : {}

    const result = await prisma.collection.findMany({
        where: whereConditions,
        skip,
        take: limit,
        orderBy: options.sortBy && options.sortOrder
            ? { [options.sortBy]: options.sortOrder }
            : {
                created_at: 'desc'
            }
    })
    const total = await prisma.collection.count({
        where: whereConditions
    })


    return {
        meta: { total, page, limit },
        data: result
    }
}

const getOne = async (id: string): Promise<Collection | null> => {
    const result = await prisma.collection.findUnique({
        where: { id }
    })
    return result;
}

const updateOne = async (id: string, payload: Partial<Collection>): Promise<Collection> => {

    const result = await prisma.collection.update({
        where: { id },
        data: payload
    })
    return result
}

const deleteOne = async (id: string): Promise<Collection> => {
    const result = await prisma.collection.delete({
        where: { id }
    });
    return result;
}

export const CollectionService = { createOne, getAll, getOne, updateOne, deleteOne }