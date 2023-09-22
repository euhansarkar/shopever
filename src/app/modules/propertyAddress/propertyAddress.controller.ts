import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { propertyAddressService } from './propertyAddress.service';
import { PropertyAddressFilterableFields } from './propertyAddress.constant';

const createOne = catchAsync(async (req, res) => {
  const result = await propertyAddressService.createOne(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `propertyAddress created`,
    data: result,
  });
});

const getAll = catchAsync(async (req, res) => {
  const filters = pick(req.query, PropertyAddressFilterableFields);
  const options = pick(req.query, paginationFields);

  const result = await propertyAddressService.getAll(filters, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `all propertyAddress found`,
    data: result,
  });
});

const getOne = catchAsync(async (req, res) => {
  const result = await propertyAddressService.getOne(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `propertyAddress found`,
    data: result,
  });
});

const updateOne = catchAsync(async (req, res) => {
  const result = await propertyAddressService.updateOne(
    req.params.id,
    req.body
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `propertyAddress updated`,
    data: result,
  });
});

const deleteOne = catchAsync(async (req, res) => {
  const result = await propertyAddressService.deleteOne(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `propertyAddress deleted`,
    data: result,
  });
});

export const propertyAddressController = {
  createOne,
  getAll,
  getOne,
  updateOne,
  deleteOne,
};
