import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { PropertyFeatureFilterableFields } from './propertyFeature.constant';
import { PropertyFeatureService } from './propertyFeature.service';

const createOne = catchAsync(async (req, res) => {
  const result = await PropertyFeatureService.createOne(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `propertyFeature created`,
    data: result,
  });
});

const getAll = catchAsync(async (req, res) => {
  const filters = pick(req.query, PropertyFeatureFilterableFields);
  const options = pick(req.query, paginationFields);

  const result = await PropertyFeatureService.getAll(filters, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `all propertyFeature found`,
    data: result,
  });
});

const getOne = catchAsync(async (req, res) => {
  const result = await PropertyFeatureService.getOne(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `propertyFeature found`,
    data: result,
  });
});

const updateOne = catchAsync(async (req, res) => {
  const result = await PropertyFeatureService.updateOne(
    req.params.id,
    req.body
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `propertyFeature updated`,
    data: result,
  });
});

const deleteOne = catchAsync(async (req, res) => {
  const result = await PropertyFeatureService.deleteOne(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `propertyFeature deleted`,
    data: result,
  });
});

export const PropertyFeatureController = {
  createOne,
  getAll,
  getOne,
  updateOne,
  deleteOne,
};
