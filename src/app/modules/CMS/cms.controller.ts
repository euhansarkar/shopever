import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import pick from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import { CMSFilterableFields } from "./CMS.constant";
import { CMSService } from "./CMS.service";

const createOne = catchAsync(async (req, res) => {
    const { metaSEO, ...CMSData } = req.body;
    const result = await CMSService.createOne(CMSData, metaSEO);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: `CMS created successfully`,
        data: result
    })
})

const getAll = catchAsync(async (req, res) => {
    const filters = pick(req.query, CMSFilterableFields);
    const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
    const result = await CMSService.getAll(filters, options);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: `CMS created successfully`,
        meta: result.meta,
        data: result.data
    })
})

const getOne = catchAsync(async (req, res) => {
    const result = await CMSService.getOne(req.params.id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: `CMS found`,
        data: result
    })
})

const updateOne = catchAsync(async (req, res) => {
    const { metaSEO, ...CMSData } = req.body;
    const result = await CMSService.updateOne(req.params.id, CMSData, metaSEO);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: `CMS updated`,
        data: result
    })
})

const deleteOne = catchAsync(async (req, res) => {
    const result = await CMSService.deleteOne(req.params.id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: `CMS deleted`,
        data: result
    })
})

export const CMSController = { createOne, getAll, getOne, updateOne, deleteOne }