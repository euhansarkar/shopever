import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { StudentService } from './student.service';
import pick from '../../../shared/pick';
import { studentFilterableFields } from './student.constant';
import { paginationFields } from '../../../constants/pagination';

const getAll = catchAsync(async (req, res) => {
  console.log(`get token from headers`, req.user);
  const filters = pick(req.query, studentFilterableFields);
  const options = pick(req.query, paginationFields);
  const result = await StudentService.getAll(filters, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `all students found`,
    data: result,
  });
});

const getOne = catchAsync(async (req, res) => {
  const result = await StudentService.getOne(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `user found`,
    data: result,
  });
});

const updateOne = catchAsync(async (req, res) => {
  const { name, student, guardian, localGuardian, ...studentData } = req.body;
  const result = await StudentService.updateOne(
    req.params.id,
    name,
    student,
    guardian,
    localGuardian
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `student updated`,
    data: result,
  });
});

const deleteOne = catchAsync(async (req, res) => {
  const result = await StudentService.deleteOne(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `student deleted`,
    data: result,
  });
});

export const StudentController = { getOne, getAll, updateOne, deleteOne };
