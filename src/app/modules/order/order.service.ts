import { BillingAddress, Order, OrderedProduct, Prisma, ShippingAddress, } from "@prisma/client";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { IGenericResponse } from "../../../interfaces/common";
import { IPaginationOptions } from "../../../interfaces/pagination";
import prisma from "../../../shared/prisma";
import { IOrderFilterRequest } from "./order.interface";
import { OrderSearchableFields } from "./order.constant";

const createOne = async (shipping_address: ShippingAddress
    , billing_address: BillingAddress, products: any, orderData: Order
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

        for (const product of products) {

            const data = { product_id: product?.product_id, order_id: orderCreation?.id }

            // product creation
            const createOrderedProduct = await transectionClient.orderedProduct.create({ data });

            // varients
            const varients = product?.varients;

            // const create ordered varients
            for (const varient of varients) {
                const createVarient = await transectionClient.varientProduct.create({ data: { ...varient, ordered_product_id: createOrderedProduct?.id } });
                console.log(`varient`, createVarient);
            }


        }

        return orderCreation
    })

    const result = await prisma.order.findUnique({ where: { id: orderCreation.id }, include: { shipping_address: true, shipping_method: true, billing_address: true, payment_method: true, products: { include: { varients: { include: { orderedProduct: true } } } } } });

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
    const result = await prisma.order.findUnique({ where: { id }, include: { shipping_address: true, shipping_method: true, billing_address: true, payment_method: true, products: { include: { varients: { include: { orderedProduct: true } } } } } });
    return result
}


const updateOne = async (id: string, shipping_address: Partial<ShippingAddress>
    , billing_address: Partial<BillingAddress>, products: any, orderData: Partial<Order>): Promise<Order | null> => {

    const getOrder = await prisma.order.findUnique({ where: { id }, include: { shipping_address: true, shipping_method: true, billing_address: true, payment_method: true, products: { include: { varients: { include: { orderedProduct: true } } } } } });

    const orderUpdation = await prisma.$transaction(async (transectionClient) => {

        // shipping address creation
        const shippingAddrUpdation = await transectionClient.shippingAddress.update({ where: { id: getOrder?.shipping_address?.id }, data: shipping_address });

        // billing address creation
        const billingAddrUpdation = await transectionClient.billingAddress.update({ where: { id: getOrder?.billing_address?.id }, data: billing_address });

        // order creation
        const orderUpdation = await transectionClient.order.update({
            where: { id: getOrder?.id },
            data: { ...orderData, shippingAddressId: shippingAddrUpdation?.id, billingAddressId: billingAddrUpdation?.id, }, include: { shipping_address: true, billing_address: true, shipping_method: true, payment_method: true }
        })

        for (const product of products) {

            const data = { product_id: product?.product_id, order_id: orderUpdation?.id }

            // product creation
            const createOrderedProduct = await transectionClient.orderedProduct.create({ data });

            // varients
            const varients = product?.varients;

            // const create ordered varients
            for (const varient of varients) {
                const createVarient = await transectionClient.varientProduct.create({ data: { ...varient, ordered_product_id: createOrderedProduct?.id } });
                console.log(`varient`, createVarient);
            }


        }

        return orderUpdation
    })

    const get = await prisma.order.findUnique({ where: { id } });

    return get;
}

const deleteOne = async (id: string): Promise<Order | null> => {

    const result = await prisma.$transaction(async (transectionClient) => {

        const result = await transectionClient.order.delete({ where: { id }, include: { shipping_address: true, billing_address: true, payment_method: true, shipping_method: true, products: { include: { varients: { include: { orderedProduct: true } } } } } });

        return result;

    })

    return result
}


export const OrderService = { createOne, getAll, getOne, deleteOne, updateOne }