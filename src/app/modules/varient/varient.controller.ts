import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { VarientService } from "./varient.service";
import pick from "../../../shared/pick";
import { VarientSearchableFields } from "./varient.constant";

const createOne = catchAsync(async (req, res) => {

    const result = await VarientService.createOne(req);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: `Varient created successfully`,
        data: result
    })
})

const getAll = catchAsync(async (req, res) => {
    const filters = pick(req.params, VarientSearchableFields);
    const options = pick(req.params, [`page`, `limit`, `sortBy`, `sortOrder`]);
    const result = await VarientService.getAll(filters, options);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: `Varients found successfully`,
        meta: result.meta,
        data: result.data
    })
})

const getOne = catchAsync(async (req, res) => {
    const result = await VarientService.getOne(req.params.id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: `Varient found`,
        data: result
    })
})

const updateOne = catchAsync(async (req, res) => {
    // const { varient_options, ...VarientData } = req.body;
    // const result = await VarientService.updateOne(VarientData, varient_options);
    // sendResponse(res, {
    //     statusCode: httpStatus.OK,
    //     success: true,
    //     message: `Varient updated`,
    //     data: result
    // })
})

const deleteOne = catchAsync(async (req, res) => {
    const result = await VarientService.deleteOne(req.params.id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: `Varient deleted`,
        data: result
    })
})

export const VarientController = { createOne, getOne, getAll, updateOne, deleteOne }