import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { ProductService } from "./product.service";

const createProduct = catchAsync(async (req, res) => {

    const { images, meta_seo, product_attributes, ...productData } = req.body;

    const result = await ProductService.createProduct(productData, images, meta_seo, product_attributes);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: `product created successfully`,
        data: result
    })
})

export const ProductController = { createProduct }