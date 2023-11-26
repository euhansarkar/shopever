import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import pick from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import { CouponService } from "./coupon.service";
import { CouponFilterableFields } from "./coupon.constant";

const createOne = catchAsync(async (req, res) => {
    const { images, metaSEO, keywords, ...CouponData } = req.body;
    const result = await CouponService.createOne(CouponData, keywords, images, metaSEO);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: `Coupon created successfully`,
        data: result
    })
})

const getAll = catchAsync(async (req, res) => {
    const filters = pick(req.query, CouponFilterableFields);
    const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
    const result = await CouponService.getAll(filters, options);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: `Coupon created successfully`,
        meta: result.meta,
        data: result.data
    })
})

const getOne = catchAsync(async (req, res) => {
    const result = await CouponService.getOne(req.params.id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: `Coupon found`,
        data: result
    })
})

const updateOne = catchAsync(async (req, res) => {
    const { images, metaSEO, keywords, ...CouponData } = req.body;
    const result = await CouponService.updateOne(req.params.id, CouponData, keywords, images, metaSEO);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: `Coupon updated`,
        data: result
    })
})

const deleteOne = catchAsync(async (req, res) => {
    const result = await CouponService.deleteOne(req.params.id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: `Coupon deleted`,
        data: result
    })
})

export const CouponController = { createOne, getAll, getOne, updateOne, deleteOne }