import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { AcademicFacultyService } from './academicFaculty.service';
import pick from '../../../shared/pick';
import { academicFacultyFilterableFields } from './academicFaculty.constant';
import { paginationFields } from '../../../constants/pagination';
import { RequestHandler } from 'express';
import { AcademicFaculty } from '@prisma/client';

const createAcademicFaculty = catchAsync(async (req, res) => {
  const result = await AcademicFacultyService.createAcademicFaculty(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `academic faculty created`,
    data: result,
  });
});

const getAllAcademicFaculties = catchAsync(async (req, res) => {
  const filters = pick(req.query, academicFacultyFilterableFields);
  const options = pick(req.query, paginationFields);

  const result = await AcademicFacultyService.getAllAcademicFaculties(
    filters,
    options
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `found all academic faculties`,
    data: result,
  });
});

const getAcademicFaculty: RequestHandler = catchAsync(async (req, res) => {
  const result = await AcademicFacultyService.getAcademicFaculty(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `academic Faculty found`,
    data: result,
  });
});

const updateAcademicFaculty = catchAsync(async (req, res) => {
  const result = await AcademicFacultyService.updateAcademicFaculty(
    req.params.id,
    req.body
  );
  sendResponse<AcademicFaculty | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `academic Faculty updated`,
    data: result,
  });
});

const deleteAcademicFaculty = catchAsync(async (req, res) => {
  const result = await AcademicFacultyService.deleteAcademicFaculty(
    req.params.id
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `academic Faculty deleted`,
    data: result,
  });
});

export const AcademicFacultyController = {
  createAcademicFaculty,
  getAllAcademicFaculties,
  getAcademicFaculty,
  updateAcademicFaculty,
  deleteAcademicFaculty,
};
