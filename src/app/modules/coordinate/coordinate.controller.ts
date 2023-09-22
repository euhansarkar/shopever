import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { CoordinateFilterableFields } from './coordinate.constant';
import { CoordinateService } from './coordinate.service';

const createOne = catchAsync(async (req, res) => {
  const result = await CoordinateService.createOne(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `coordinate created`,
    data: result,
  });
});

const getAll = catchAsync(async (req, res) => {
  const filters = pick(req.query, CoordinateFilterableFields);
  const options = pick(req.query, paginationFields);

  const result = await CoordinateService.getAll(filters, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `all coordinate found`,
    data: result,
  });
});

const getOne = catchAsync(async (req, res) => {
  const result = await CoordinateService.getOne(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `coordinate found`,
    data: result,
  });
});

const updateOne = catchAsync(async (req, res) => {
  const result = await CoordinateService.updateOne(req.params.id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `coordinate updated`,
    data: result,
  });
});

const deleteOne = catchAsync(async (req, res) => {
  const result = await CoordinateService.deleteOne(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `coordinate deleted`,
    data: result,
  });
});

export const CoordinateController = {
  createOne,
  getAll,
  getOne,
  updateOne,
  deleteOne,
};
