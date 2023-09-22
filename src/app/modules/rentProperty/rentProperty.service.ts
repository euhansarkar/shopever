import { RentProperty, Prisma } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { IRentPropertyFilterRequest } from './rentProperty.interface';
import { RentPropertySearchableFields } from './rentProperty.constant';
import { IGenericResponse } from '../../../interfaces/common';

const createOne = async (data: RentProperty): Promise<RentProperty | null> => {
  const result = await prisma.rentProperty.create({
    data,
  });
  return result;
};

const getAll = async (
  filters: IRentPropertyFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<RentProperty[]>> => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: RentPropertySearchableFields.map(field => ({
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

  const whereConditions: Prisma.RentPropertyWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const orderBy: any =
    options.sortBy && options.sortOrder
      ? { [options.sortBy]: options.sortOrder }
      : {
          createdAt: 'desc',
        };

  const result = await prisma.rentProperty.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy,
  });
  const total = await prisma.rentProperty.count({
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

const getOne = async (id: string): Promise<RentProperty | null> => {
  const result = await prisma.rentProperty.findUnique({
    where: {
      id,
    },
    include: {
      propertyAddresses: {
        include: {
          city: true,
          coordinate: true,
        },
      },
    },
  });
  return result;
};

const updateOne = async (
  id: string,
  payload: Partial<RentProperty>
): Promise<RentProperty | null> => {
  const result = await prisma.rentProperty.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};

const deleteOne = async (id: string): Promise<RentProperty | null> => {
  const result = await prisma.rentProperty.delete({
    where: {
      id,
    },
  });
  return result;
};

export const rentPropertyService = {
  createOne,
  getAll,
  getOne,
  updateOne,
  deleteOne,
};
