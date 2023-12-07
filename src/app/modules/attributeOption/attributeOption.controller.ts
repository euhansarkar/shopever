import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { AttributeOptionService } from "./attributeOption.service";


const updateOne = catchAsync(async (req, res) => {
    
    const result = await AttributeOptionService.updateOne(req.params.id, req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: `attribute option updated`,
        data: result
    })
})


export const AttributeOptionController = {
    updateOne,

}