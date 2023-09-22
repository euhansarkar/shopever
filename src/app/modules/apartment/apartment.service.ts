import { Apartment, Prisma } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { IAcademicDepartmentFilterRequest } from '../academicDepartment/academicDepartment.interface';
import {
  ApartmentRelationalFields,
  ApartmentRelationalFieldsMapper,
  ApartmentSearchableFields,
} from './apartment.constant';

const createOne = async (data: Apartment): Promise<Apartment | null> => {
  const result = await prisma.apartment.create({
    data,
  });
  return result;
};

const getAll = async (
  filters: IAcademicDepartmentFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<Apartment[]>> => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: ApartmentSearchableFields.map(field => ({
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
        if (ApartmentRelationalFields.includes(key)) {
          return {
            [ApartmentRelationalFieldsMapper[key]]: {
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

  const whereConditions: Prisma.ApartmentWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const orderBy: any =
    options?.sortBy && options?.sortOrder
      ? { [options.sortBy]: options.sortOrder }
      : { createdAt: 'desc' };

  const result = await prisma.apartment.findMany({
    where: whereConditions,
    skip,
    take: limit,
    // orderBy,
  });
  const total = await prisma.apartment.count({
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

const getOne = async (id: string): Promise<Apartment | null> => {
  const result = await prisma.apartment.findUnique({
    where: {
      id,
    },
  });
  return result;
};

const updateOne = async (
  id: string,
  payload: Partial<Apartment>
): Promise<Apartment | null> => {
  const result = await prisma.apartment.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};

const deleteOne = async (id: string): Promise<Apartment | null> => {
  const result = await prisma.apartment.delete({
    where: {
      id,
    },
  });
  return result;
};

export const ApartmentService = {
  createOne,
  getAll,
  getOne,
  updateOne,
  deleteOne,
};
