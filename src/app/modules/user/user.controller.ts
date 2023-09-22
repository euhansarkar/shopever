import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { UserService } from './user.service';
import pick from '../../../shared/pick';
import { paginationFields } from '../../../constants/pagination';
import { userFilterableFields } from './user.constant';

const createStudent = catchAsync(async (req, res) => {
  const { name, student, guardian, localGuardian, ...studentData } = req.body;

  const result = await UserService.createStudent(
    name,
    student,
    guardian,
    localGuardian,
    studentData
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `user created`,
    data: result,
  });
});

const createFaculty = catchAsync(async (req, res) => {
  const { name, student, guardian, localGuardian, ...studentData } = req.body;

  const result = await UserService.createStudent(
    name,
    student,
    guardian,
    localGuardian,
    studentData
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `user created`,
    data: result,
  });
});

export const UserController = { createStudent, createFaculty };
