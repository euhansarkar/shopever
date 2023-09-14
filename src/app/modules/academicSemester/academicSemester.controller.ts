import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { AcademicSemesterService } from './academicSemester.service';
import { RequestHandler } from 'express';
import pick from '../../../shared/pick';
import { academicSemesterFilterableFields } from './academicSemester.constant';
import { paginationFields } from '../../../constants/pagination';
import { AcademicSemester } from '@prisma/client';

const createAcademicSemester: RequestHandler = catchAsync(async (req, res) => {
  const result = await AcademicSemesterService.createAcademicSemester(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `academic semester created`,
    data: result,
  });
});

const getAllAcademicSemesters: RequestHandler = catchAsync(async (req, res) => {
  const filters = pick(req.query, academicSemesterFilterableFields);
  const options = pick(req.query, paginationFields);

  const result = await AcademicSemesterService.getAllAcademicSemesters(
    filters,
    options
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `all semester data found`,
    data: result,
  });
});

const getAcademicSemester: RequestHandler = catchAsync(async (req, res) => {
  const result = await AcademicSemesterService.getAcademicSemester(
    req.params.id
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `academic semester found`,
    data: result,
  });
});

const updateAcademicSemester = catchAsync(async (req, res) => {
  const result = await AcademicSemesterService.updateAcademicSemester(
    req.params.id,
    req.body
  );
  sendResponse<AcademicSemester | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `academic semester updated`,
    data: result,
  });
});

const deleteAcademicSemester = catchAsync(async (req, res) => {
  const result = await AcademicSemesterService.deleteAcademicSemester(
    req.params.id
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `academic semester deleted`,
    data: result,
  });
});

export const AcademicSemesterController = {
  createAcademicSemester,
  getAllAcademicSemesters,
  updateAcademicSemester,
  deleteAcademicSemester,
  getAcademicSemester,
};
