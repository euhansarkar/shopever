import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { UserService } from './user.service';
import pick from '../../../shared/pick';
import { paginationFields } from '../../../constants/pagination';
import { userFilterableFields } from './user.constant';

const createUser = catchAsync(async (req, res) => {
  const result = await UserService.createUser(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `user created`,
    data: result,
  });
});

const getAllUsers = catchAsync(async (req, res) => {
  const filters = pick(req.query, userFilterableFields);
  const options = pick(req.query, paginationFields);
  const result = await UserService.getAllUsers(filters, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `all users found`,
    data: result,
  });
});

const bulkDelete = catchAsync(async (req, res) => {
  const result = await UserService.bulkDelete();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `users bulk deleted`,
    data: result,
  });
});

export const UserController = { createUser, bulkDelete, getAllUsers };
