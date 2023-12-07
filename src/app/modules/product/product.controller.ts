import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { ProductService } from "./product.service";
import pick from "../../../shared/pick";
import { ProductSearchableFields } from "./product.constant";

const createProduct = catchAsync(async (req, res) => {

    const { meta_seo, ...productData } = req.body;

    const result = await ProductService.createOne(productData, meta_seo);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: `product created successfully`,
        data: result
    })
})

const getAll = catchAsync(async (req, res) => {
    const filters = pick(req.params, ProductSearchableFields);
    const options = pick(req.params, [`page`, `limit`, `sortBy`, `sortOrder`]);
    const result = await ProductService.getAll(filters, options);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: `products found successfully`,
        meta: result.meta,
        data: result.data
    })
})

const getOne = catchAsync(async (req, res) => {
    const result = await ProductService.getOne(req.params.id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: `product found`,
        data: result
    })
})

const updateOne = catchAsync(async (req, res) => {
    const { meta_seo, ...productData } = req.body;
    const result = await ProductService.updateOne(req.params.id, productData, meta_seo);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: `product updated`,
        data: result
    })
})

const deleteOne = catchAsync(async (req, res) => {
    const result = await ProductService.deleteOne(req.params.id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: `product deleted`,
        data: result
    })
})

export const ProductController = { createProduct, getOne, getAll, updateOne, deleteOne }