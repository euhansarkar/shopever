import { AcademicDepartment, Prisma } from '@prisma/client';
import prisma from '../../../shared/prisma';
import { IAcademicDepartmentFilterRequest } from './academicDepartment.interface';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { IGenericResponse } from '../../../interfaces/common';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { academicDepartmentSearchableFields } from './academicDepartment.constant';

const createAcademicDepartment = async (data: AcademicDepartment) => {
  const result = await prisma.academicDepartment.create({
    data,
  });
  return result;
};

const getAllAcademicDepartments = async (
  filters: IAcademicDepartmentFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<AcademicDepartment[]>> => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: academicDepartmentSearchableFields.map(field => ({
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

  const whereConditions: Prisma.AcademicDepartmentWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.academicDepartment.findMany({
    where: whereConditions,
    skip,
    take: limit,
  });
  const total = await prisma.academicDepartment.count({
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

const getAcademicDepartment = async (
  id: string
): Promise<AcademicDepartment | null> => {
  const result = await prisma.academicDepartment.findUnique({
    where: {
      id,
    },
  });
  return result;
};

const updateAcademicDepartment = async (
  id: string,
  payload: Partial<AcademicDepartment>
): Promise<AcademicDepartment | null> => {
  const result = await prisma.academicDepartment.update({
    where: {
      id,
    },
    data: payload,
  });

  return result;
};

const deleteAcademicDepartment = async (
  id: string
): Promise<AcademicDepartment> => {
  const result = await prisma.academicDepartment.delete({
    where: {
      id,
    },
  });
  return result;
};

export const AcademicDepartmentService = {
  createAcademicDepartment,
  getAllAcademicDepartments,
  getAcademicDepartment,
  updateAcademicDepartment,
  deleteAcademicDepartment,
};
