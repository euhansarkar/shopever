import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { FacultyFilterableFields } from './faculty.constant';
import { FacultyService } from './faculty.service';

const getAll = catchAsync(async (req, res) => {
  const filters = pick(req.query, FacultyFilterableFields);
  const options = pick(req.query, paginationFields);
  const result = await FacultyService.getAll(filters, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `all Facultys found`,
    data: result,
  });
});

const getOne = catchAsync(async (req, res) => {
  const result = await FacultyService.getOne(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `user found`,
    data: result,
  });
});

const updateOne = catchAsync(async (req, res) => {
  const { name, faculty } = req.body;
  const result = await FacultyService.updateOne(req.params.id, name, faculty);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `Faculty updated`,
    data: result,
  });
});

const deleteOne = catchAsync(async (req, res) => {
  const result = await FacultyService.deleteOne(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `Faculty deleted`,
    data: result,
  });
});

export const FacultyController = { getOne, getAll, updateOne, deleteOne };
