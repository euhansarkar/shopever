import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { UserService } from './user.service';

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
    message: `student created`,
    data: result,
  });
});

const createFaculty = catchAsync(async (req, res) => {
  const { name, faculty, ...facultyData } = req.body;

  const result = await UserService.createFaculty(name, faculty, facultyData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `faculty created`,
    data: result,
  });
});

const createAdmin = catchAsync(async (req, res) => {
  const { name, admin, ...adminData } = req.body;

  const result = await UserService.createAdmin(name, admin, adminData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `admin created`,
    data: result,
  });
});

export const UserController = { createStudent, createFaculty, createAdmin };
