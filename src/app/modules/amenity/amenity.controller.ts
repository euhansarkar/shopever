import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { AmenityFilterableFields } from './amenity.constant';
import { AmenityService } from './amenity.service';

const createOne = catchAsync(async (req, res) => {
  const result = await AmenityService.createOne(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `Amenity created`,
    data: result,
  });
});

const getAll = catchAsync(async (req, res) => {
  const filters = pick(req.query, AmenityFilterableFields);
  const options = pick(req.query, paginationFields);

  const result = await AmenityService.getAll(filters, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `all Amenity found`,
    data: result,
  });
});

const getOne = catchAsync(async (req, res) => {
  const result = await AmenityService.getOne(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `Amenity found`,
    data: result,
  });
});

const updateOne = catchAsync(async (req, res) => {
  const result = await AmenityService.updateOne(req.params.id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `Amenity updated`,
    data: result,
  });
});

const deleteOne = catchAsync(async (req, res) => {
  const result = await AmenityService.deleteOne(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `Amenity deleted`,
    data: result,
  });
});

export const AmenityController = {
  createOne,
  getAll,
  getOne,
  updateOne,
  deleteOne,
};
