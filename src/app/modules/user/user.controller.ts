import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { UserService } from './user.service';


const createCustomer = catchAsync(async (req, res) => {
  const { name, customer, ...userData } = req.body;
  console.log(userData);

  const result = await UserService.createCustomer(name, customer, userData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `customer created`,
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

export const UserController = { createCustomer, createAdmin };
