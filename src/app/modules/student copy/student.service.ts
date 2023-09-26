import { Guardian, LocalGuardian, Name, Prisma, Student } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { IStudentFilterRequest } from './student.interface';
import {
  studentRelationalFields,
  studentRelationalFieldsMapper,
  studentSearchableFields,
} from './student.constant';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';

const getAll = async (
  filters: IStudentFilterRequest,
  options: IPaginationOptions
) => {


  const { limit, page, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: studentSearchableFields.map(field => ({
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
        if (studentRelationalFields.includes(key)) {
          return {
            [studentRelationalFieldsMapper[key]]: {
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

  const whereConditions: Prisma.StudentWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.student.findMany({
    include: {
      academicDepartment: true,
      academicFaculty: true,
      academicSemester: true,
      guardian: true,
      localGuardian: true,
    },
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
  const total = await prisma.student.count({
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

const getOne = async (id: string): Promise<Student | null> => {
  const result = await prisma.student.findUnique({
    where: {
      id,
    },
    include: {
      guardian: true,
      localGuardian: true,
      name: true,
      academicDepartment: true,
      academicFaculty: true,
      academicSemester: true,
    },
  });

  return result;
};

const updateOne = async (
  id: string,
  nameData: Partial<Name>,
  studentData: Partial<Student>,
  guardianData: Partial<Guardian>,
  localGuardianData: Partial<LocalGuardian>
): Promise<Student | null> => {
  const isExist = await prisma.student.findUnique({ where: { id } });

  if (!isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, `student not found`);
  }

  await prisma.$transaction(async transectionClient => {
    await transectionClient.name.update({
      where: {
        id: isExist.nameId,
      },
      data: { ...nameData },
    });

    await transectionClient.student.update({
      where: {
        id: isExist.id, // Update based on the unique student id
      },
      data: { ...studentData },
    });

    await transectionClient.guardian.update({
      where: {
        id: isExist.guardianId,
      },
      data: { ...guardianData },
    });

    await transectionClient.localGuardian.update({
      where: {
        id: isExist.localGuardianId,
      },
      data: { ...localGuardianData },
    });
  });

  const result = await prisma.student.findUnique({
    where: {
      id,
    },
    include: {
      name: true,
      guardian: true,
    },
  });

  return result;
};


const deleteOne = async (id: string): Promise<Student | null> => {
  const isExist = await prisma.student.findUnique({ where: { id } });

  if (!isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, `Student not found`);
  }

  const result = await prisma.$transaction(async transactionClient => {
    await transactionClient.name.delete({
      where: {
        id: isExist.nameId,
      },
    });

    await transactionClient.student.delete({
      where: {
        id: isExist.id,
      },
    });

    await transactionClient.guardian.delete({
      where: {
        id: isExist.guardianId,
      },
    });

    await transactionClient.localGuardian.delete({
      where: {
        id: isExist.localGuardianId,
      },
    });
  });

  return isExist;
};

export const StudentService = { getOne, getAll, updateOne, deleteOne };
