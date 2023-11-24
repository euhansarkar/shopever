import { ManagementDepartment, Prisma } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { IManagementDepartmentFilterRequest } from './managementDepartment.interface';
import { ManagementDepartmentSearchableFields } from './managementDepartment.constant';

const createOne = async (
  data: ManagementDepartment
): Promise<ManagementDepartment | null> => {
  const result = await prisma.managementDepartment.create({
    data,
  });
  return result;
};

const getAll = async (
  filters: IManagementDepartmentFilterRequest,
  options: IPaginationOptions
) => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: ManagementDepartmentSearchableFields.map(field => ({
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

  const whereConditions: Prisma.ManagementDepartmentWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.managementDepartment.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : {
          created_at: "desc"
        },
  });
  const total = await prisma.managementDepartment.count({
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

const getOne = async (id: string): Promise<ManagementDepartment | null> => {
  const result = await prisma.managementDepartment.findUnique({
    where: {
      id,
    },
  });
  return result;
};

const updateOne = async (
  id: string,
  payload: Partial<ManagementDepartment>
): Promise<ManagementDepartment | null> => {
  const result = await prisma.managementDepartment.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};

const deleteOne = async (id: string): Promise<ManagementDepartment | null> => {
  const result = await prisma.managementDepartment.delete({
    where: {
      id,
    },
  });
  return result;
};

export const ManagementDepartmentService = {
  createOne,
  getAll,
  getOne,
  updateOne,
  deleteOne,
};
