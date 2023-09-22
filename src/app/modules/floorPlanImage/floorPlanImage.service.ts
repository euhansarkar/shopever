import { Prisma, FloorPlanImage } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { IAcademicDepartmentFilterRequest } from '../academicDepartment/academicDepartment.interface';
import {
  FloorPlanImageRelationalFields,
  FloorPlanImageRelationalFieldsMapper,
  FloorPlanImageSearchableFields,
} from './floorPlanImage.constant';

const createOne = async (data: FloorPlanImage): Promise<FloorPlanImage | null> => {
  const result = await prisma.floorPlanImage.create({
    data,
  });
  return result;
};

const getAll = async (
  filters: IAcademicDepartmentFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<FloorPlanImage[]>> => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: FloorPlanImageSearchableFields.map(field => ({
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
        if (FloorPlanImageRelationalFields.includes(key)) {
          return {
            [FloorPlanImageRelationalFieldsMapper[key]]: {
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

  const whereConditions: Prisma.FloorPlanImageWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const orderBy: any =
    options?.sortBy && options?.sortOrder
      ? { [options.sortBy]: options.sortOrder }
      : { createdAt: 'desc' };

  const result = await prisma.floorPlanImage.findMany({
    where: whereConditions,
    skip,
    take: limit,
    // orderBy,
  });
  const total = await prisma.floorPlanImage.count({
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

const getOne = async (id: string): Promise<FloorPlanImage | null> => {
  const result = await prisma.floorPlanImage.findUnique({
    where: {
      id,
    },
  });
  return result;
};

const updateOne = async (
  id: string,
  payload: Partial<FloorPlanImage>
): Promise<FloorPlanImage | null> => {
  const result = await prisma.floorPlanImage.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};

const deleteOne = async (id: string): Promise<FloorPlanImage | null> => {
  const result = await prisma.floorPlanImage.delete({
    where: {
      id,
    },
  });
  return result;
};

export const FloorPlanImageService = {
  createOne,
  getAll,
  getOne,
  updateOne,
  deleteOne,
};
