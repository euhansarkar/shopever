import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { AttributeService } from "./attribute.service";
import pick from "../../../shared/pick";
import { AttributeFilterableFields } from "./attribute.constant";

const createOne = catchAsync(async (req, res) => {
    const { attribute_options, ...attributeData } = req.body;
    const result = await AttributeService.createOne(attributeData, attribute_options);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: `attribute created`,
        data: result
    })
})

const getAll = catchAsync(async (req, res) => {
    const filters = pick(req.query, AttributeFilterableFields);
    const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
    const result = await AttributeService.getAll(filters, options);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: `attributes found successfully`,
        meta: result.meta,
        data: result.data
    })
})

const getOne = catchAsync(async (req, res) => {
    const result = await AttributeService.getOne(req.params.id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: `attribute found`,
        data: result
    })
})

const deleteOne = catchAsync(async (req, res) => {
    const result = await AttributeService.deleteOne(req.params.id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: `attribute deleted`,
        data: result
    })
})

const updateOne = catchAsync(async (req, res) => {
    const { attribute_options, ...attributeData } = req.body;
    const result = await AttributeService.updateOne(req.params.id, attributeData, attribute_options);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: `attribute updated`,
        data: result
    })
})

export const AttributeController = { createOne, getAll, getOne, deleteOne, updateOne }