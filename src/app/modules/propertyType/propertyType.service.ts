import prisma from '../../../shared/prisma';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { PropertyTypeSearchableFields } from './propertyType.constant';
import { Prisma, PropertyType } from '@prisma/client';
import { IPropertyTypeFilterRequest } from './propertyType.interface';

const createpropertyType = async (
  data: PropertyType
): Promise<PropertyType | null> => {
  const result = await prisma.propertyType.create({
    data,
  });
  return result;
};

const getAllpropertyTypees = async (
  filters: IPropertyTypeFilterRequest,
  options: IPaginationOptions
) => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: PropertyTypeSearchableFields.map(field => ({
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

  const whereConditions: Prisma.PropertyTypeWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.propertyType.findMany({
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
  const total = await prisma.propertyType.count({
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

const getOne = async (id: string): Promise<PropertyType | null> => {
  const result = await prisma.propertyType.findUnique({
    where: {
      id,
    },
  });
  return result;
};

const updateOne = async (
  id: string,
  payload: Partial<PropertyType>
): Promise<PropertyType | null> => {
  const result = await prisma.propertyType.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};

const deleteOne = async (id: string): Promise<PropertyType | null> => {
  const result = await prisma.propertyType.delete({
    where: {
      id,
    },
  });
  return result;
};

export const PropertyTypeService = {
  createpropertyType,
  getAllpropertyTypees,
  getOne,
  updateOne,
  deleteOne,
};
