import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { ManagementDepartmentFilterableFields } from './managementDepartment.constant';
import { ManagementDepartmentService } from './managementDepartment.service';

const createOne = catchAsync(async (req, res) => {
  const result = await ManagementDepartmentService.createOne(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `ManagementDepartment created`,
    data: result,
  });
});

const getAll = catchAsync(async (req, res) => {
  const filters = pick(req.query, ManagementDepartmentFilterableFields);
  const options = pick(req.query, paginationFields);

  const result = await ManagementDepartmentService.getAll(filters, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `all ManagementDepartment found`,
    data: result,
  });
});

const getOne = catchAsync(async (req, res) => {
  const result = await ManagementDepartmentService.getOne(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `ManagementDepartment found`,
    data: result,
  });
});

const updateOne = catchAsync(async (req, res) => {
  const result = await ManagementDepartmentService.updateOne(
    req.params.id,
    req.body
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `ManagementDepartment updated`,
    data: result,
  });
});

const deleteOne = catchAsync(async (req, res) => {
  const result = await ManagementDepartmentService.deleteOne(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `ManagementDepartment deleted`,
    data: result,
  });
});

export const ManagementDepartmentController = {
  createOne,
  getAll,
  getOne,
  updateOne,
  deleteOne,
};
