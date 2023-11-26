import { PaymentMethod, Prisma } from "@prisma/client";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { IGenericResponse } from "../../../interfaces/common";
import { IPaginationOptions } from "../../../interfaces/pagination";
import prisma from "../../../shared/prisma";
import { IPaymentMethodFilterRequest } from "./paymentMethod.interface";
import { PaymentMethodSearchableFields } from "./paymentMethod.constant";

const createOne = async (data: PaymentMethod): Promise<PaymentMethod | null> => {
    const result = await prisma.paymentMethod.create({ data });
    return result;
}

const getAll = async (filters: IPaymentMethodFilterRequest, options: IPaginationOptions): Promise<IGenericResponse<PaymentMethod[]>> => {
    const { limit, page, skip } = paginationHelpers.calculatePagination(options);
    const { searchTerm, ...filterData } = filters;
    const andConditions = [];

    if (searchTerm) {
        andConditions.push({
            OR: PaymentMethodSearchableFields.map(field => ({
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

    const whereConditions: Prisma.PaymentMethodWhereInput = andConditions.length > 0 ? { AND: andConditions } : {}

    const result = await prisma.paymentMethod.findMany({
        where: whereConditions,
        skip,
        take: limit,
        orderBy: options.sortBy && options.sortOrder
            ? { [options.sortBy]: options.sortOrder }
            : {
                created_at: 'desc'
            }
    })
    const total = await prisma.paymentMethod.count({
        where: whereConditions
    })


    return {
        meta: { total, page, limit },
        data: result
    }
}

const getOne = async (id: string): Promise<PaymentMethod | null> => {
    const result = await prisma.paymentMethod.findUnique({
        where: { id }
    })
    return result;
}

const updateOne = async (id: string, payload: Partial<PaymentMethod>): Promise<PaymentMethod> => {

    const result = await prisma.paymentMethod.update({
        where: { id },
        data: payload
    })
    return result
}

const deleteOne = async (id: string): Promise<PaymentMethod> => {
    const result = await prisma.paymentMethod.delete({
        where: { id }
    });
    return result;
}

export const PaymentMethodService = { createOne, getAll, getOne, updateOne, deleteOne }