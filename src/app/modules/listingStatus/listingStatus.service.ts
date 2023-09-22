import { ListingStatus, Prisma } from '@prisma/client';
import prisma from '../../../shared/prisma';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { IListingStatusFilterRequest } from './listingStatus.interface';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { listingStatusSearchableFields } from './listingStatus.constant';

const createListingStatus = async (
  data: ListingStatus
): Promise<ListingStatus | null> => {
  const result = await prisma.listingStatus.create({
    data,
  });
  return result;
};

const getAllListingStatuses = async (
  filters: IListingStatusFilterRequest,
  options: IPaginationOptions
) => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: listingStatusSearchableFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map(key => ({
        [key]: {
          equals: (filterData as any)[key],
        },
      })),
    });
  }

  const whereConditions: Prisma.ListingStatusWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.listingStatus.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : {
            createdAt: 'desc',
          },
  });
  const total = await prisma.listingStatus.count({
    where: whereConditions,
  });

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

const getOne = async (id: string): Promise<ListingStatus | null> => {
  const result = await prisma.listingStatus.findUnique({
    where: {
      id,
    },
  });
  return result;
};

const updateOne = async (
  id: string,
  payload: Partial<ListingStatus>
): Promise<ListingStatus | null> => {
  const result = await prisma.listingStatus.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};

const deleteOne = async (id: string): Promise<ListingStatus | null> => {
  const result = await prisma.listingStatus.delete({
    where: {
      id,
    },
  });
  return result;
};

export const ListingStatusService = {
  createListingStatus,
  getAllListingStatuses,
  getOne,
  updateOne,
  deleteOne,
};
