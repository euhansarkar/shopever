import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { PaymentService } from "./payment.service";


const createOne = catchAsync(async (req, res) => {
    const result = await PaymentService.createOne(req.body);
    sendResponse(res, { statusCode: httpStatus.OK, success: true, message: "client secret created", data: result })
})


export const PaymentController = {
    createOne,
}