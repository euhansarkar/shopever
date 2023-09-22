import { City, Prisma } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { ICityFilterRequest } from './city.interface';
import {
  CityRelationalFields,
  CityRelationalFieldsMapper,
  CitySearchableFields,
} from './city.constant';
import { IGenericResponse } from '../../../interfaces/common';

const createOne = async (data: City): Promise<City | null> => {
  const result = await prisma.city.create({
    data,
    include: {
      country: true,
    },
  });
  return result;
};

const getAll = async (
  filters: ICityFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<City[]>> => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: CitySearchableFields.map(field => ({
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
        if (CityRelationalFields.includes(key)) {
          return {
            [CityRelationalFieldsMapper[key]]: {
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

  const whereConditions: Prisma.CityWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const orderBy: any =
    options?.sortBy && options?.sortOrder
      ? { [options.sortBy]: options.sortOrder }
      : { createdAt: 'desc' };

  const result = await prisma.city.findMany({
    where: whereConditions,
    skip,
    take: limit,
    // orderBy,
  });
  const total = await prisma.city.count({
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

const getOne = async (id: string): Promise<City | null> => {
  const result = await prisma.city.findUnique({
    where: {
      id,
    },
  });
  return result;
};

const updateOne = async (
  id: string,
  payload: Partial<City>
): Promise<City | null> => {
  const result = await prisma.city.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};

const deleteOne = async (id: string): Promise<City | null> => {
  const result = await prisma.city.delete({
    where: {
      id,
    },
  });
  return result;
};

export const CityService = {
  createOne,
  getAll,
  getOne,
  updateOne,
  deleteOne,
};
