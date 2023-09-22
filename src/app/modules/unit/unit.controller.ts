import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { UnitFilterableFields } from './unit.constant';
import { UnitService } from './unit.service';

const createOne = catchAsync(async (req, res) => {
  const result = await UnitService.createOne(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `unit created`,
    data: result,
  });
});

const getAll = catchAsync(async (req, res) => {
  const filters = pick(req.query, UnitFilterableFields);
  const options = pick(req.query, paginationFields);

  const result = await UnitService.getAll(filters, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `all unit found`,
    data: result,
  });
});

const getOne = catchAsync(async (req, res) => {
  const result = await UnitService.getOne(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `unit found`,
    data: result,
  });
});

const updateOne = catchAsync(async (req, res) => {
  const result = await UnitService.updateOne(req.params.id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `unit updated`,
    data: result,
  });
});

const deleteOne = catchAsync(async (req, res) => {
  const result = await UnitService.deleteOne(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `unit deleted`,
    data: result,
  });
});

export const UnitController = {
  createOne,
  getAll,
  getOne,
  updateOne,
  deleteOne,
};
