import { Prisma, Student, User } from '@prisma/client';
import prisma from '../../../shared/prisma';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';
import { generateStudentId } from './user.utils';
import config from '../../../config';
import { IUserFilterRequest } from './user.interface';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { IGenericResponse } from '../../../interfaces/common';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { userSearchableFields } from './user.constant';

const createStudent = async (
  student: Student,
  data: User
): Promise<User | null> => {
  console.log(student);

  const sem = {
    code: `01`,
    year: `2025`,
  };

  // generate user id
  const id = await generateStudentId(sem);
  data.id = id;

  // default password
  if (!data.password) {
    data.password = config.default_user_pass as string;
  }

  const result = await prisma.user.create({
    data,
  });

  // if failed to create user
  if (!result) {
    throw new ApiError(httpStatus.OK, `failed to create new user`);
  }

  return result;
};

const getAllUsers = async (
  filters: IUserFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<User[]>> => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: userSearchableFields.map(field => ({
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

  const whereConditions: Prisma.UserWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.user.findMany({
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
  const total = await prisma.user.count({
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

const bulkDelete = async () => {
  const result = await prisma.user.deleteMany({});
  return result;
};

export const UserService = { createStudent, bulkDelete, getAllUsers };
