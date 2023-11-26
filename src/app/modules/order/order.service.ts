import { Prisma, Order } from '@prisma/client';
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { IGenericResponse } from "../../../interfaces/common";
import { IPaginationOptions } from "../../../interfaces/pagination";
import prisma from "../../../shared/prisma";
import { IOrderFilterRequest } from "./order.interface";
import { OrderSearchableFields } from "./order.constant";

const createOne = async (data: Order): Promise<Order | null> => {
    const result = await prisma.order.create({ data });
    return result;
}

const getAll = async (filters: IOrderFilterRequest, options: IPaginationOptions): Promise<IGenericResponse<Order[]>> => {
    const { limit, page, skip } = paginationHelpers.calculatePagination(options);
    const { searchTerm, ...filterData } = filters;
    const andConditions = [];

    if (searchTerm) {
        andConditions.push({
            OR: OrderSearchableFields.map(field => ({
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

    const whereConditions: Prisma.OrderWhereInput = andConditions.length > 0 ? { AND: andConditions } : {}

    const result = await prisma.order.findMany({
        where: whereConditions,
        skip,
        take: limit,
        orderBy: options.sortBy && options.sortOrder
            ? { [options.sortBy]: options.sortOrder }
            : {
                created_at: 'desc'
            }
    })
    const total = await prisma.order.count({
        where: whereConditions
    })


    return {
        meta: { total, page, limit },
        data: result
    }
}

const getOne = async (id: string): Promise<Order | null> => {
    const result = await prisma.order.findUnique({
        where: { id }
    })
    return result;
}

const updateOne = async (id: string, payload: Partial<Order>): Promise<Order> => {

    const result = await prisma.order.update({
        where: { id },
        data: payload
    })
    return result
}

const deleteOne = async (id: string): Promise<Order> => {
    const result = await prisma.order.delete({
        where: { id }
    });
    return result;
}

export const OrderService = { createOne, getAll, getOne, updateOne, deleteOne }