import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import pick from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import { StoreService } from "./store.service";
import { StoreFilterableFields } from "./store.constant";


const createOne = catchAsync(async (req, res) => {
    const result = await StoreService.createOne(req.body);
    sendResponse(res, { statusCode: httpStatus.OK, success: true, message: "Store created", data: result })
})

const getAll = catchAsync(async (req, res) => {
    const filters = pick(req.query, StoreFilterableFields);
    const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
    const result = await StoreService.getAll(filters, options);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: `all Stores found`,
        meta: result.meta,
        data: result.data
    })
})

const getOne = catchAsync(async (req, res) => {
    const result = await StoreService.getOne(req.params.id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: `Store found`,
        data: result
    })
})

const updateOne = catchAsync(async (req, res) => {
    const result = await StoreService.updateOne(req.params.id, req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: `Store updated`,
        data: result
    })
})

const deleteOne = catchAsync(async (req, res) => {
    const result = await StoreService.deleteOne(req.params.id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: `Store deleted`,
        data: result
    })
})

export const StoreController = {
    createOne,
    getAll,
    getOne,
    updateOne,
    deleteOne
}