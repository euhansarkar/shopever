import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { CustomerFilterableFields } from './customer.constant';
import { CustomerService } from './customer.service';

const getAll = catchAsync(async (req, res) => {
  const filters = pick(req.query, CustomerFilterableFields);
  const options = pick(req.query, paginationFields);
  const result = await CustomerService.getAll(filters, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `all Customers found`,
    data: result,
  });
});

const getOne = catchAsync(async (req, res) => {
  const result = await CustomerService.getOne(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `user found`,
    data: result,
  });
});

const updateOne = catchAsync(async (req, res) => {
  const { name, customer } = req.body;
  const result = await CustomerService.updateOne(req.params.id, name, customer);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `Customer updated`,
    data: result,
  });
});

const deleteOne = catchAsync(async (req, res) => {
  const result = await CustomerService.deleteOne(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `Customer deleted`,
    data: result,
  });
});

export const CustomerController = { getOne, getAll, updateOne, deleteOne };
