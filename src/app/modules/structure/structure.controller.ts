import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { StructureService } from './structure.service';
import { StructureFilterableFields } from './structure.constant';

const createOne = catchAsync(async (req, res) => {
  const result = await StructureService.createOne(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `structure created`,
    data: result,
  });
});

const getAll = catchAsync(async (req, res) => {
  const filters = pick(req.query, StructureFilterableFields);
  const options = pick(req.query, paginationFields);

  const result = await StructureService.getAll(filters, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `all structure found`,
    data: result,
  });
});

const getOne = catchAsync(async (req, res) => {
  const result = await StructureService.getOne(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `structure found`,
    data: result,
  });
});

const updateOne = catchAsync(async (req, res) => {
  const result = await StructureService.updateOne(req.params.id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `structure updated`,
    data: result,
  });
});

const deleteOne = catchAsync(async (req, res) => {
  const result = await StructureService.deleteOne(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `structure deleted`,
    data: result,
  });
});

export const structureController = {
  createOne,
  getAll,
  getOne,
  updateOne,
  deleteOne,
};
