import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { CategoryService } from "./category.service";
import pick from "../../../shared/pick";
import { categoryFilterableFields } from "./category.constant";

const createOne = catchAsync(async (req, res) => {

    const result = await CategoryService.createOne(req);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: `category created successfully`,
        data: result
    })
})

const getAll = catchAsync(async (req, res) => {
    const filters = pick(req.query, categoryFilterableFields);
    const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
    const result = await CategoryService.getAll(filters, options);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: `category created successfully`,
        meta: result.meta,
        data: result.data
    })
})

const getOne = catchAsync(async (req, res) => {
    const result = await CategoryService.getOne(req.params.id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: `category found`,
        data: result
    })
})

const updateOne = catchAsync(async (req, res) => {
    const { images, metaSEO, keywords, ...categoryData } = req.body;
    const result = await CategoryService.updateOne(req.params.id, categoryData, keywords, images, metaSEO);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: `category updated`,
        data: result
    })
})

const deleteOne = catchAsync(async (req, res) => {
    const result = await CategoryService.deleteOne(req.params.id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: `category deleted`,
        data: result
    })
})

export const CategoryController = { createOne, getAll, getOne, updateOne, deleteOne }