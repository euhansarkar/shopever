import { Guardian, LocalGuardian, Name, Prisma, Faculty } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import {
  FacultyRelationalFields,
  FacultyRelationalFieldsMapper,
  FacultySearchableFields,
} from './faculty.constant';
import { IFacultyFilterRequest } from './faculty.interface';

const getAll = async (
  filters: IFacultyFilterRequest,
  options: IPaginationOptions
) => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: FacultySearchableFields.map(field => ({
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
        if (FacultyRelationalFields.includes(key)) {
          return {
            [FacultyRelationalFieldsMapper[key]]: {
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

  const whereConditions: Prisma.FacultyWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.faculty.findMany({
    include: {
      academicDepartment: true,
      academicFaculty: true,
    },
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
  const total = await prisma.faculty.count({
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

const getOne = async (id: string): Promise<Faculty | null> => {
  const result = await prisma.faculty.findUnique({
    where: {
      id,
    },
    include: {
      name: true,
      academicDepartment: true,
      academicFaculty: true,
    },
  });

  return result;
};

const updateOne = async (
  id: string,
  nameData: Partial<Name>,
  facultyData: Partial<Faculty>,
): Promise<Faculty | null> => {
  const isExist = await prisma.faculty.findUnique({ where: { id } });

  if (!isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, `Faculty not found`);
  }

  await prisma.$transaction(async transectionClient => {
    await transectionClient.name.update({
      where: {
        id: isExist.nameId,
      },
      data: { ...nameData },
    });

    await transectionClient.faculty.update({
      where: {
        id: isExist.id, // Update based on the unique Faculty id
      },
      data: { ...facultyData },
    });
  });

  const result = await prisma.faculty.findUnique({
    where: {
      id,
    },
    include: {
      name: true,
    },
  });

  return result;
};

const deleteOne = async (id: string): Promise<Faculty | null> => {
  const isExist = await prisma.faculty.findUnique({ where: { id } });

  if (!isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, `Faculty not found`);
  }

  const result = await prisma.$transaction(async transactionClient => {
    await transactionClient.name.delete({
      where: {
        id: isExist.nameId,
      },
    });

    await transactionClient.faculty.delete({
      where: {
        id: isExist.id,
      },
    });
  });

  return isExist;
};

export const FacultyService = { getOne, getAll, updateOne, deleteOne };
