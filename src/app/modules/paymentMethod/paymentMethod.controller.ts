import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import pick from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import { PaymentMethodService } from "./paymentMethod.service";
import { PaymentMethodFilterableFields } from "./paymentMethod.constant";


const createOne = catchAsync(async (req, res) => {
    const result = await PaymentMethodService.createOne(req.body);
    sendResponse(res, { statusCode: httpStatus.OK, success: true, message: "attribute group created", data: result })
})

const getAll = catchAsync(async (req, res) => {
    const filters = pick(req.query, PaymentMethodFilterableFields);
    const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
    const result = await PaymentMethodService.getAll(filters, options);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: `all attribute groups found`,
        meta: result.meta,
        data: result.data
    })
})

const getOne = catchAsync(async (req, res) => {
    const result = await PaymentMethodService.getOne(req.params.id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: `attribute group found`,
        data: result
    })
})

const updateOne = catchAsync(async (req, res) => {
    const result = await PaymentMethodService.updateOne(req.params.id, req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: `attribute group updated`,
        data: result
    })
})

const deleteOne = catchAsync(async (req, res) => {
    const result = await PaymentMethodService.deleteOne(req.params.id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: `attribute group deleted`,
        data: result
    })
})

export const PaymentMethodController = {
    createOne,
    getAll,
    getOne,
    updateOne,
    deleteOne
}