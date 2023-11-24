import { Customer, Name, Prisma } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { ICustomerFilterRequest } from './customerInfo.interface';
import {
  CustomerRelationalFields,
  CustomerRelationalFieldsMapper,
  CustomerSearchableFields,
} from './customerInfo.constant';

const getAll = async (
  filters: ICustomerFilterRequest,
  options: IPaginationOptions
) => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: CustomerSearchableFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map(key => {
        if (CustomerRelationalFields.includes(key)) {
          return {
            [CustomerRelationalFieldsMapper[key]]: {
              id: (filterData as any)[key],
            },
          };
        } else {
          return {
            [key]: {
              equals: (filterData as any)[key],
            },
          };
        }
      }),
    });
  }

  const whereConditions: Prisma.CustomerWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.customer.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : {
          created_at: 'desc',
        },
  });
  const total = await prisma.customer.count({
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

const getOne = async (id: string): Promise<Customer | null> => {
  const result = await prisma.customer.findUnique({
    where: {
      id,
    },
    include: {
      name: true,
    },
  });

  return result;
};

const updateOne = async (
  id: string,
  nameData: Partial<Name>,
  customerData: Partial<Customer>
): Promise<Customer | null> => {
  const isExist = await prisma.customer.findUnique({ where: { id } });

  if (!isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, `customer not found`);
  }

  await prisma.$transaction(async transectionClient => {
    await transectionClient.name.update({
      where: {
        id: isExist.name_id,
      },
      data: { ...nameData },
    });

    await transectionClient.customer.update({
      where: {
        id: isExist.id, // Update based on the unique customer id
      },
      data: { ...customerData },
    });
  });

  const result = await prisma.customer.findUnique({
    where: {
      id,
    },
    include: {
      name: true,
    },
  });

  return result;
};

const deleteOne = async (id: string): Promise<Customer | null> => {
  const isExist = await prisma.customer.findUnique({ where: { id } });

  if (!isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, `customer not found`);
  }

  const result = await prisma.$transaction(async transactionClient => {
    await transactionClient.name.delete({
      where: {
        id: isExist.name_id,
      },
    });

    await transactionClient.customer.delete({
      where: {
        id: isExist.id,
      },
    });
  });

  return isExist;
};

export const CustomerService = { getOne, getAll, updateOne, deleteOne };
