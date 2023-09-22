import { Prisma, PropertyAddress } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { IPropertyAddressFilterRequest } from './propertyAddress.interface';
import {
  PropertyAddressRelationalFields,
  PropertyAddressRelationalFieldsMapper,
  PropertyAddressSearchableFields,
} from './propertyAddress.constant';

const createOne = async (
  data: PropertyAddress
): Promise<PropertyAddress | null> => {
  const result = await prisma.propertyAddress.create({
    data,
    include: {
      coordinate: true,
      property: true,
      city: true,
    },
  });
  return result;
};

const getAll = async (
  filters: IPropertyAddressFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<PropertyAddress[]>> => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: PropertyAddressSearchableFields.map(field => ({
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
        if (PropertyAddressRelationalFields.includes(key)) {
          return {
            [PropertyAddressRelationalFieldsMapper[key]]: {
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

  const whereConditions: Prisma.PropertyAddressWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const orderBy: any =
    options?.sortBy && options?.sortOrder
      ? { [options.sortBy]: options.sortOrder }
      : { createdAt: 'desc' };

  const result = await prisma.propertyAddress.findMany({
    where: whereConditions,
    skip,
    take: limit,
    // orderBy,
  });
  const total = await prisma.propertyAddress.count({
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

const getOne = async (id: string): Promise<PropertyAddress | null> => {
  const result = await prisma.propertyAddress.findUnique({
    where: {
      id,
    },
    include: {
      city: true,
      coordinate: true,
      property: true,
    },
  });
  return result;
};

const updateOne = async (
  id: string,
  payload: Partial<PropertyAddress>
): Promise<PropertyAddress | null> => {
  const result = await prisma.propertyAddress.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};

const deleteOne = async (id: string): Promise<PropertyAddress | null> => {
  const result = await prisma.propertyAddress.delete({
    where: {
      id,
    },
  });
  return result;
};

export const propertyAddressService = {
  createOne,
  getAll,
  getOne,
  updateOne,
  deleteOne,
};
