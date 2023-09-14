import { Prisma } from '@prisma/client';
import prisma from '../../shared/prisma';
import ApiError from '../../errors/ApiError';
import httpStatus from 'http-status';

export const sameYearTimePretend: Prisma.Middleware = async (
  params: Prisma.MiddlewareParams,
  next
) => {
  if (params.action === 'create' && params.model === 'AcademicSemester') {
    const data = params.args.data;

    const isExist = await prisma.academicSemester.findFirst({
      where: {
        title: data.title,
        year: data.year,
      },
    });

    if (isExist) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        `academic semester is already exist`
      );
    }
  }
  return await next(params);
};
