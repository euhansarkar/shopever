import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { ListingStatusService } from './listingStatus.service';
import pick from '../../../shared/pick';
import { paginationFields } from '../../../constants/pagination';
import { listingStatusFilterableFields } from './listingStatus.constant';

const createListingStatus = catchAsync(async (req, res) => {
  const result = await ListingStatusService.createListingStatus(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `listing status created`,
    data: result,
  });
});

const getAllListingStatuses = catchAsync(async (req, res) => {
  const filters = pick(req.query, listingStatusFilterableFields);
  const options = pick(req.query, paginationFields);

  const result = await ListingStatusService.getAllListingStatuses(
    filters,
    options
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `all listing status found`,
    data: result,
  });
});

const getOne = catchAsync(async (req, res) => {
  const result = await ListingStatusService.getOne(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `listing found`,
    data: result,
  });
});

const updateOne = catchAsync(async (req, res) => {
  const result = await ListingStatusService.updateOne(req.params.id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `listing updated`,
    data: result,
  });
});


const deleteOne = catchAsync(async (req, res) => {
  const result = await ListingStatusService.deleteOne(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `listing deleted`,
    data: result,
  });
});

export const ListingStatusController = {
  createListingStatus,
  getAllListingStatuses,
  getOne,
  updateOne,
  deleteOne
};
