import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { CityFilterableFields } from './city.constant';
import { CityService } from './city.service';

const createOne = catchAsync(async (req, res) => {
  const result = await CityService.createOne(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `City created`,
    data: result,
  });
});

const getAll = catchAsync(async (req, res) => {
  const filters = pick(req.query, CityFilterableFields);
  const options = pick(req.query, paginationFields);

  const result = await CityService.getAll(filters, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `all City found`,
    data: result,
  });
});

const getOne = catchAsync(async (req, res) => {
  const result = await CityService.getOne(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `City found`,
    data: result,
  });
});

const updateOne = catchAsync(async (req, res) => {
  const result = await CityService.updateOne(req.params.id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `City updated`,
    data: result,
  });
});

const deleteOne = catchAsync(async (req, res) => {
  const result = await CityService.deleteOne(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `City deleted`,
    data: result,
  });
});

export const CityController = {
  createOne,
  getAll,
  getOne,
  updateOne,
  deleteOne,
};
