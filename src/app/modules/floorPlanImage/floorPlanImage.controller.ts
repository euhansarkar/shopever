import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { FloorPlanImageService } from './floorPlanImage.service';
import { FloorPlanImageFilterableFields } from './floorPlanImage.constant';

const createOne = catchAsync(async (req, res) => {
  const result = await FloorPlanImageService.createOne(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `FloorPlanImage created`,
    data: result,
  });
});

const getAll = catchAsync(async (req, res) => {
  const filters = pick(req.query, FloorPlanImageFilterableFields);
  const options = pick(req.query, paginationFields);

  const result = await FloorPlanImageService.getAll(filters, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `all FloorPlanImage found`,
    data: result,
  });
});

const getOne = catchAsync(async (req, res) => {
  const result = await FloorPlanImageService.getOne(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `FloorPlanImage found`,
    data: result,
  });
});

const updateOne = catchAsync(async (req, res) => {
  const result = await FloorPlanImageService.updateOne(req.params.id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `FloorPlanImage updated`,
    data: result,
  });
});

const deleteOne = catchAsync(async (req, res) => {
  const result = await FloorPlanImageService.deleteOne(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `FloorPlanImage deleted`,
    data: result,
  });
});

export const FloorPlanImageController = {
  createOne,
  getAll,
  getOne,
  updateOne,
  deleteOne,
};
