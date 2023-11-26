import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import pick from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import { CollectionFilterableFields } from "./collection.constant";
import { CollectionService } from "./collection.service";


const createOne = catchAsync(async (req, res) => {
    const result = await CollectionService.createOne(req.body);
    sendResponse(res, { statusCode: httpStatus.OK, success: true, message: "collection created", data: result })
})

const getAll = catchAsync(async (req, res) => {
    const filters = pick(req.query, CollectionFilterableFields);
    const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
    const result = await CollectionService.getAll(filters, options);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: `all collections found`,
        meta: result.meta,
        data: result.data
    })
})

const getOne = catchAsync(async (req, res) => {
    const result = await CollectionService.getOne(req.params.id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: `collection found`,
        data: result
    })
})

const updateOne = catchAsync(async (req, res) => {
    const result = await CollectionService.updateOne(req.params.id, req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: `collection updated`,
        data: result
    })
})

const deleteOne = catchAsync(async (req, res) => {
    const result = await CollectionService.deleteOne(req.params.id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: `collection deleted`,
        data: result
    })
})

export const CollectionController = {
    createOne,
    getAll,
    getOne,
    updateOne,
    deleteOne
}