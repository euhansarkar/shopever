import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { PropertyTypeService } from './propertyType.service';
import pick from '../../../shared/pick';
import { paginationFields } from '../../../constants/pagination';
import { PropertyTypeFilterableFields } from './propertyType.constant';

const createpropertyType = catchAsync(async (req, res) => {
  const result = await PropertyTypeService.createpropertyType(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `property type created`,
    data: result,
  });
});

const getAllpropertyTypees = catchAsync(async (req, res) => {
  const filters = pick(req.query, PropertyTypeFilterableFields);
  const options = pick(req.query, paginationFields);

  const result = await PropertyTypeService.getAllpropertyTypees(
    filters,
    options
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `all property types found`,
    data: result,
  });
});

const getOne = catchAsync(async (req, res) => {
  const result = await PropertyTypeService.getOne(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `property found`,
    data: result,
  });
});

const updateOne = catchAsync(async (req, res) => {
  const result = await PropertyTypeService.updateOne(req.params.id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `property updated`,
    data: result,
  });
});

const deleteOne = catchAsync(async (req, res) => {
  const result = await PropertyTypeService.deleteOne(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `property deleted`,
    data: result,
  });
});

export const PropertyTypeController = {
  createpropertyType,
  getAllpropertyTypees,
  getOne,
  updateOne,
  deleteOne,
};
