import { BillingAddress, Order, Prisma, ShippingAddress } from "@prisma/client";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { IGenericResponse } from "../../../interfaces/common";
import { IPaginationOptions } from "../../../interfaces/pagination";
import prisma from "../../../shared/prisma";
import { IOrderFilterRequest } from "./order.interface";
import { OrderSearchableFields } from "./order.constant";

const createOne = async (shipping_address: ShippingAddress
    , billing_address: BillingAddress, orderData: Order
): Promise<Order | null> => {

    const orderCreation = await prisma.$transaction(async (transectionClient) => {

        // shipping address creation
        const shippingAddrCreation = await transectionClient.shippingAddress.create({ data: shipping_address });

        // billing address creation
        const billingAddrCreation = await transectionClient.billingAddress.create({ data: billing_address });

        // order creation
        const orderCreation = await transectionClient.order.create({
            data: { ...orderData, shippingAddressId: shippingAddrCreation?.id, billingAddressId: billingAddrCreation?.id, }, include: { shipping_address: true, billing_address: true, shipping_method: true, payment_method: true }
        })

        return orderCreation
    })

    const result = await prisma.order.findUnique({ where: { id: orderCreation.id } });

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

    const whereConditions: Prisma.OrderWhereInput = andConditions.length > 0 ? { AND: andConditions } : {}

    const result = await prisma.order.findMany({
        where: whereConditions,
        skip,
        take: limit,
        orderBy:
            options.sortBy && options.sortOrder
                ? { [options.sortBy]: options.sortOrder }
                : {
                    created_at: "desc"
                }
    });
    const total = await prisma.order.count({
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

const getOne = async (id: string): Promise<Order | null> => {
    const result = await prisma.order.findUnique({
        where: {
            id
        }
    })
    return result
}


const updateOne = async (id: string, shipping_address: Partial<ShippingAddress>
    , billing_address: Partial<BillingAddress>, orderData: Partial<Order>): Promise<Order | null> => {

    const orderUpdation = await prisma.$transaction(async (transectionClient) => {
        // shipping address updation
        const shippingAddrCreation = await transectionClient.shippingAddress.update({ where: { id: shipping_address?.id }, data: shipping_address });

        // billing address updation
        const billingAddrCreation = await transectionClient.billingAddress.update({ where: { id: billing_address?.id }, data: billing_address });

        // order updation
        const orderCreation = await transectionClient.order.update({
            where: { id: orderData?.id }, data: { ...orderData }
        })

        return orderCreation
    })

    const get = await prisma.order.findUnique({ where: { id } });

    return get;
}

const deleteOne = async (id: string): Promise<Order | null> => {

    const result = await prisma.$transaction(async (transectionClient) => {

        const result = await transectionClient.order.delete({ where: { id }, include: { shipping_address: true, billing_address: true } });

        return result;

    })

    return result
}


export const OrderService = { createOne, getAll, getOne, deleteOne, updateOne }