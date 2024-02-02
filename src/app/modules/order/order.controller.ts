import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import pick from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import { OrderService } from "./order.service";
import { OrderFilterableFields } from "./order.constant";

const createOne = catchAsync(async (req, res) => {
    const { shipping_address, billing_address, products, ...orderData } = req.body;
    const result = await OrderService.createOne(shipping_address, billing_address, products, orderData);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: `Order created`,
        data: result
    })
})

const getAll = catchAsync(async (req, res) => {
    const filters = pick(req.query, OrderFilterableFields);
    const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
    const result = await OrderService.getAll(filters, options);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: `Orders found successfully`,
        meta: result.meta,
        data: result.data
    })
})

const getOne = catchAsync(async (req, res) => {
    const result = await OrderService.getOne(req.params.id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: `Order found`,
        data: result
    })
})

const deleteOne = catchAsync(async (req, res) => {
    const result = await OrderService.deleteOne(req.params.id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: `Order deleted`,
        data: result
    })
})

const updateOne = catchAsync(async (req, res) => {
    const { shipping_address, billing_address, products, ...orderData } = req.body;
    const result = await OrderService.updateOne(req.params.id, shipping_address, billing_address, products, orderData);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: `Order updated`,
        data: result
    })
})

export const OrderController = { createOne, getAll, getOne, deleteOne, updateOne }