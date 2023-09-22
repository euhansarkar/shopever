import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { ApartmentService } from './apartment.service';
import { ApartmentFilterableFields } from './apartment.constant';

const createOne = catchAsync(async (req, res) => {
  const result = await ApartmentService.createOne(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `apartment created`,
    data: result,
  });
});

const getAll = catchAsync(async (req, res) => {
  const filters = pick(req.query, ApartmentFilterableFields);
  const options = pick(req.query, paginationFields);

  const result = await ApartmentService.getAll(filters, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `all apartment found`,
    data: result,
  });
});

const getOne = catchAsync(async (req, res) => {
  const result = await ApartmentService.getOne(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `apartment found`,
    data: result,
  });
});

const updateOne = catchAsync(async (req, res) => {
  const result = await ApartmentService.updateOne(req.params.id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `apartment updated`,
    data: result,
  });
});

const deleteOne = catchAsync(async (req, res) => {
  const result = await ApartmentService.deleteOne(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `apartment deleted`,
    data: result,
  });
});

export const ApartmentController = {
  createOne,
  getAll,
  getOne,
  updateOne,
  deleteOne,
};
