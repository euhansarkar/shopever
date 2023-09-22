import { Country, Prisma } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { CountrySearchableFields } from './country.constant';
import { ICountryFilterRequest } from './country.interface';

const createcountry = async (data: Country): Promise<Country | null> => {
  const result = await prisma.country.create({
    data,
  });
  return result;
};

const getAllcountryes = async (
  filters: ICountryFilterRequest,
  options: IPaginationOptions
) => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: CountrySearchableFields.map(field => ({
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

  const whereConditions: Prisma.CountryWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.country.findMany({
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
  const total = await prisma.country.count({
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

const getOne = async (id: string): Promise<Country | null> => {
  const result = await prisma.country.findUnique({
    where: {
      id,
    },
  });
  return result;
};

const updateOne = async (
  id: string,
  payload: Partial<Country>
): Promise<Country | null> => {
  const result = await prisma.country.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};

const deleteOne = async (id: string): Promise<Country | null> => {
  const result = await prisma.country.delete({
    where: {
      id,
    },
  });
  return result;
};

export const CountryService = {
  createcountry,
  getAllcountryes,
  getOne,
  updateOne,
  deleteOne,
};
