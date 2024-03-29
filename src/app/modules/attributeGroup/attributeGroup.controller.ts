import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import { AttributeGroupService } from "./attributeGroup.service";
import sendResponse from "../../../shared/sendResponse";
import pick from "../../../shared/pick";
import { AttributeGroupFilterableFields } from "./attributeGroup.constant";


const createOne = catchAsync(async (req, res) => {
    const result = await AttributeGroupService.createOne(req.body);
    sendResponse(res, { statusCode: httpStatus.OK, success: true, message: "attribute group created", data: result })
})

const getAll = catchAsync(async (req, res) => {
    const filters = pick(req.query, AttributeGroupFilterableFields);
    const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
    const result = await AttributeGroupService.getAll(filters, options);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: `all attribute groups found`,
        meta: result.meta,
        data: result.data
    })
})

const getOne = catchAsync(async (req, res) => {
    const result = await AttributeGroupService.getOne(req.params.id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: `attribute group found`,
        data: result
    })
})

const updateOne = catchAsync(async (req, res) => {
    const result = await AttributeGroupService.updateOne(req.params.id, req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: `attribute group updated`,
        data: result
    })
})

const deleteOne = catchAsync(async (req, res) => {
    const result = await AttributeGroupService.deleteOne(req.params.id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: `attribute group deleted`,
        data: result
    })
})

export const attributeGroupController = {
    createOne,
    getAll,
    getOne,
    updateOne,
    deleteOne
}