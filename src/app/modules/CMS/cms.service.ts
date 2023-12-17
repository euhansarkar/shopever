import { CMS, MetaSEO, Prisma } from "@prisma/client";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { IGenericResponse } from "../../../interfaces/common";
import { IPaginationOptions } from "../../../interfaces/pagination";
import prisma from "../../../shared/prisma";
import { ICMSFilterRequest } from "./CMS.interface";
import { CMSSearchableFields } from "./CMS.constant";

const createOne = async (CMSData: CMS, metaSEO: MetaSEO): Promise<CMS | null> => {

    const result = await prisma.$transaction(async transectionClient => {
        const metaSEOCreation = await transectionClient.metaSEO.create({ data: metaSEO })

        const CMSCreation = await transectionClient.cMS.create({ data: { ...CMSData, metaSEOId: metaSEOCreation.id } })

        return CMSCreation;
    })

    const get = await prisma.cMS.findUnique({ where: { id: result.id }, include: { MetaSEO: true } })
    return get;
}

const getAll = async (filters: ICMSFilterRequest, options: IPaginationOptions): Promise<IGenericResponse<CMS[]>> => {
    const { limit, page, skip } = paginationHelpers.calculatePagination(options);
    const { searchTerm, ...filterData } = filters;
    const andConditions = [];

    if (searchTerm) {
        andConditions.push({
            OR: CMSSearchableFields.map(field => ({
                [field]: {
                    contains: searchTerm,
                    mode: 'insensitive'
                }
            }))
        })
    }

    if (Object.keys(filterData).length > 0) {
        andConditions.push({
            AND: Object.keys(filterData).map(key => ({
                [key]: {
                    equals: (filterData as any)[key]
                }
            }))
        })
    }

    const whereConditions: Prisma.CMSWhereInput = andConditions.length > 0 ? { AND: andConditions } : {}

    const result = await prisma.cMS.findMany({
        where: whereConditions,
        skip,
        take: limit,
        orderBy: options.sortBy && options.sortOrder
            ? { [options.sortBy]: options.sortOrder }
            : {
                created_at: 'desc'
            },
        include: { MetaSEO: true }
    })
    const total = await prisma.cMS.count({
        where: whereConditions
    })


    return {
        meta: { total, page, limit },
        data: result
    }
}

const getOne = async (id: string): Promise<CMS | null> => {
    const result = await prisma.cMS.findUnique({
        where: { id },
        include: { MetaSEO: true }
    })
    return result;
}

const updateOne = async (id: string, CMSData: Partial<CMS>, metaSEO: Partial<MetaSEO>): Promise<CMS | null> => {

    let get = await prisma.cMS.findUnique({ where: { id } })

    const result = await prisma.$transaction(async transectionClient => {
        const metaSEOCreation = await transectionClient.metaSEO.update({ where: { id: get?.metaSEOId! }, data: metaSEO })

        const CMSCreation = await transectionClient.cMS.update({ where: { id }, data: CMSData })

        return CMSCreation;
    })


    get = await prisma.cMS.findUnique({
        where: { id: result.id },
        include: { MetaSEO: true }
    })

    return get;
}

const deleteOne = async (id: string): Promise<CMS> => {
    const result = await prisma.cMS.delete({
        where: { id },
        include: { MetaSEO: true }
    });
    return result;
}

export const CMSService = { createOne, getAll, getOne, updateOne, deleteOne }