import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { AcademicDepartmentService } from './academicDepartment.service';
import pick from '../../../shared/pick';
import { academicDepartmentFilterableFields } from './academicDepartment.constant';
import { paginationFields } from '../../../constants/pagination';
import { RequestHandler } from 'express';
import { AcademicDepartment } from '@prisma/client';

const createAcademicDepartment = catchAsync(async (req, res) => {
  const result = await AcademicDepartmentService.createAcademicDepartment(
    req.body
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `academic Department created`,
    data: result,
  });
});

const getAllAcademicDepartments = catchAsync(async (req, res) => {
  const filters = pick(req.query, academicDepartmentFilterableFields);
  const options = pick(req.query, paginationFields);

  const result = await AcademicDepartmentService.getAllAcademicDepartments(
    filters,
    options
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `found all academic Departments`,
    data: result,
  });
});

const getAcademicDepartment: RequestHandler = catchAsync(async (req, res) => {
  const result = await AcademicDepartmentService.getAcademicDepartment(
    req.params.id
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `academic Department found`,
    data: result,
  });
});

const updateAcademicDepartment = catchAsync(async (req, res) => {
  const result = await AcademicDepartmentService.updateAcademicDepartment(
    req.params.id,
    req.body
  );
  sendResponse<AcademicDepartment | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `academic Department updated`,
    data: result,
  });
});

const deleteAcademicDepartment = catchAsync(async (req, res) => {
  const result = await AcademicDepartmentService.deleteAcademicDepartment(
    req.params.id
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `academic Department deleted`,
    data: result,
  });
});

export const AcademicDepartmentController = {
  createAcademicDepartment,
  getAllAcademicDepartments,
  getAcademicDepartment,
  updateAcademicDepartment,
  deleteAcademicDepartment,
};
