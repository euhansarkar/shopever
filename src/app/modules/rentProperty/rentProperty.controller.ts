import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { rentPropertyService } from './rentProperty.service';
import { RentPropertyFilterableFields } from './rentProperty.constant';

const createOne = catchAsync(async (req, res) => {
  const result = await rentPropertyService.createOne(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `rentProperty created`,
    data: result,
  });
});

const getAll = catchAsync(async (req, res) => {
  const filters = pick(req.query, RentPropertyFilterableFields);
  const options = pick(req.query, paginationFields);

  const result = await rentPropertyService.getAll(
    filters,
    options
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `all rentProperty found`,
    data: result,
  });
});

const getOne = catchAsync(async (req, res) => {
  const result = await rentPropertyService.getOne(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `rentProperty found`,
    data: result,
  });
});

const updateOne = catchAsync(async (req, res) => {
  const result = await rentPropertyService.updateOne(req.params.id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `rentProperty updated`,
    data: result,
  });
});

const deleteOne = catchAsync(async (req, res) => {
  const result = await rentPropertyService.deleteOne(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `rentProperty deleted`,
    data: result,
  });
});

export const RentPropertyController = {
  createOne,
  getAll,
  getOne,
  updateOne,
  deleteOne,
};
