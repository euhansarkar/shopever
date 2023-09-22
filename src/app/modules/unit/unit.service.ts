import { Prisma, Unit } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { IAcademicDepartmentFilterRequest } from '../academicDepartment/academicDepartment.interface';
import {
  UnitRelationalFields,
  UnitRelationalFieldsMapper,
  UnitSearchableFields,
} from './unit.constant';

const createOne = async (data: Unit): Promise<Unit | null> => {
  const result = await prisma.unit.create({
    data,
  });
  return result;
};

const getAll = async (
  filters: IAcademicDepartmentFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<Unit[]>> => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: UnitSearchableFields.map(field => ({
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
        if (UnitRelationalFields.includes(key)) {
          return {
            [UnitRelationalFieldsMapper[key]]: {
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

  const whereConditions: Prisma.UnitWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const orderBy: any =
    options?.sortBy && options?.sortOrder
      ? { [options.sortBy]: options.sortOrder }
      : { createdAt: 'desc' };

  const result = await prisma.unit.findMany({
    where: whereConditions,
    skip,
    take: limit,
    // orderBy,
  });
  const total = await prisma.unit.count({
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

const getOne = async (id: string): Promise<Unit | null> => {
  const result = await prisma.unit.findUnique({
    where: {
      id,
    },
  });
  return result;
};

const updateOne = async (
  id: string,
  payload: Partial<Unit>
): Promise<Unit | null> => {
  const result = await prisma.unit.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};

const deleteOne = async (id: string): Promise<Unit | null> => {
  const result = await prisma.unit.delete({
    where: {
      id,
    },
  });
  return result;
};

export const UnitService = {
  createOne,
  getAll,
  getOne,
  updateOne,
  deleteOne,
};
