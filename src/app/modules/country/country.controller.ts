import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { CountryFilterableFields } from './country.constant';
import { CountryService } from './country.service';

const createOne = catchAsync(async (req, res) => {
  const result = await CountryService.createOne(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `country created`,
    data: result,
  });
});

const getAll = catchAsync(async (req, res) => {
  const filters = pick(req.query, CountryFilterableFields);
  const options = pick(req.query, paginationFields);

  const result = await CountryService.getAll(filters, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `all country found`,
    data: result,
  });
});

const getOne = catchAsync(async (req, res) => {
  const result = await CountryService.getOne(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `country found`,
    data: result,
  });
});

const updateOne = catchAsync(async (req, res) => {
  const result = await CountryService.updateOne(req.params.id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `country updated`,
    data: result,
  });
});

const deleteOne = catchAsync(async (req, res) => {
  const result = await CountryService.deleteOne(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `country deleted`,
    data: result,
  });
});

export const countryController = {
  createOne,
  getAll,
  getOne,
  updateOne,
  deleteOne,
};
