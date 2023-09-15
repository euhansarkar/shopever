import { AcademicSemester } from '@prisma/client';
import prisma from '../../../shared/prisma';

//User ID
export const findLastUserId = async (): Promise<string | undefined> => {
  const lastUser = await prisma.user.findFirst({
    select: { id: true },
    orderBy: { createdAt: 'desc' },
  });
  return lastUser?.id.toString();
};

export const generateUserId = async () => {
  const currentId = (await findLastUserId()) || '0'.padStart(5, '0'); // '00000'
  const incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0');
  return incrementedId;
};

// Student ID
export const findLastStudentId = async (): Promise<string | undefined> => {
  const lastStudent = await prisma.user.findFirst({
    where: {
      role: 'student',
    },
    select: {
      id: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return lastStudent?.id ? lastStudent.id.substring(4) : undefined;
};

export const generateStudentId = async (
  academicSemester: any
): Promise<string> => {
  const currentId = (await findLastStudentId()) || '00000';

  let incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0');

  incrementedId = `${academicSemester.year.substring(2)}${
    academicSemester.code
  }${incrementedId}`;

  return incrementedId;
};

// Faculty ID
export const findLastFacultyId = async (): Promise<string | undefined> => {
  const lastFaculty = await prisma.user.findFirst({
    where: {
      role: 'faculty',
    },
    select: {
      id: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return lastFaculty?.id ? lastFaculty.id.substring(2) : undefined;
};

export const generateFacultyId = async (): Promise<string> => {
  const currentId = (await findLastFacultyId()) || '00000';

  // increment by 1
  let incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0');

  incrementedId = `F-${incrementedId}`;

  return incrementedId;
};
// Admin ID
export const findLastAdminId = async (): Promise<string | undefined> => {
  const lastAdmin = await prisma.user.findFirst({
    where: {
      role: 'admin',
    },
    select: {
      id: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return lastAdmin?.id ? lastAdmin.id.substring(2) : undefined;
};

export const generateAdminId = async (): Promise<string> => {
  const currentId = (await findLastAdminId()) || '00000';

  let incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0');
  incrementedId = `A-${incrementedId}`;

  return incrementedId;
};
