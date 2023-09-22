import { Prisma, PropertyFeature } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { IAcademicDepartmentFilterRequest } from '../academicDepartment/academicDepartment.interface';
import { PropertyFeatureRelationalFields, PropertyFeatureRelationalFieldsMapper, PropertyFeatureSearchableFields } from './propertyFeature.constant';

const createOne = async (data: PropertyFeature): Promise<PropertyFeature | null> => {
  const result = await prisma.propertyFeature.create({
    data,
  });
  return result;
};

const getAll = async (
  filters: IAcademicDepartmentFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<PropertyFeature[]>> => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: PropertyFeatureSearchableFields.map(field => ({
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
        if (PropertyFeatureRelationalFields.includes(key)) {
          return {
            [PropertyFeatureRelationalFieldsMapper[key]]: {
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

  const whereConditions: Prisma.PropertyFeatureWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const orderBy: any =
    options?.sortBy && options?.sortOrder
      ? { [options.sortBy]: options.sortOrder }
      : { createdAt: 'desc' };

  const result = await prisma.propertyFeature.findMany({
    where: whereConditions,
    skip,
    take: limit,
    // orderBy,
  });
  const total = await prisma.propertyFeature.count({
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

const getOne = async (id: string): Promise<PropertyFeature | null> => {
  const result = await prisma.propertyFeature.findUnique({
    where: {
      id,
    },
  });
  return result;
};

const updateOne = async (
  id: string,
  payload: Partial<PropertyFeature>
): Promise<PropertyFeature | null> => {
  const result = await prisma.propertyFeature.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};

const deleteOne = async (id: string): Promise<PropertyFeature | null> => {
  const result = await prisma.propertyFeature.delete({
    where: {
      id,
    },
  });
  return result;
};

export const PropertyFeatureService = {
  createOne,
  getAll,
  getOne,
  updateOne,
  deleteOne,
};
