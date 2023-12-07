import { MetaSEO, Varient, Prisma, } from '@prisma/client';
import prisma from "../../../shared/prisma";
import { IPaginationOptions } from '../../../interfaces/pagination';
import { IGenericResponse } from '../../../interfaces/common';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { VarientRelationalFields, VarientRelationalFieldsMapper, VarientSearchableFields } from './varient.constant';
import { IVarientFilterRequest } from './varient.interface';
import { Request } from 'express';
import { FileUploadHeler } from '../../../helpers/fileUploadHelper';

const createOne = async (req: Request): Promise<Varient | null> => {
    const files = req.files as IFile[];

    const images: ICloudinary[] = [];

    await Promise.all(files.map(async file => {
        const uploadedImage = await FileUploadHeler.uploadToCloudinary(file) as ICloudinary;
        images.push(uploadedImage);
    }))

    const { varient_options, ...varientData } = req.body;

    const result = await prisma.$transaction(async transectionClient => {

        console.log(`get images`, images);

        //Varient creation
        const varientCreation = await transectionClient.varient.create({ data: varientData });

        //Varient Option Creation
        for (const varient of varient_options) {
            const data = { ...varient, varient_id: varientCreation.id }
            const myRes = await transectionClient.varientOption.create({ data });
        }

        //images creation 
        for (const img of images) {
            console.log(`image creation`, img);
            const data = { image_url: img.secure_url, varient_id: varientCreation.id }
            await transectionClient.image.create({ data });

        }


        return varientCreation;

    })

    const get = await prisma.varient.findUnique({ where: { id: result.id }, include: { product: true, images: true } });

    return get;
}


const getAll = async (filters: IVarientFilterRequest, options: IPaginationOptions): Promise<IGenericResponse<Varient[]>> => {

    const { limit, page, skip } = paginationHelpers.calculatePagination(options);
    const { searchTerm, ...filterData } = filters;

    const andConditions = [];

    if (searchTerm) {
        OR: VarientSearchableFields.map(field => ({
            [field]: {
                contains: searchTerm,
                mode: "insensitive"
            }
        }))
    }

    if (Object.keys(filterData).length > 0) {
        andConditions.push({
            AND: Object.keys(filterData).map(key => {
                if (VarientRelationalFields.includes(key)) {
                    return {
                        [VarientRelationalFieldsMapper[key]]: {
                            id: (filterData as any)[key]
                        }
                    }
                } else {
                    return {
                        [key]: {
                            equals: (filterData as any)[key]
                        }
                    }
                }
            })
        })
    }

    const whereConditions: Prisma.VarientWhereInput = andConditions.length > 0 ? { AND: andConditions } : {}

    const result = await prisma.varient.findMany({ include: { images: true, product: true }, where: whereConditions, skip, take: limit, orderBy: options.sortBy && options.sortOrder ? { [options.sortBy]: options.sortOrder } : { created_at: "desc" } })

    const total = await prisma.varient.count({
        where: whereConditions
    })

    return {
        meta: {
            total,
            page,
            limit
        },
        data: result
    }
}

const getOne = async (id: string): Promise<Varient | null> => {
    const result = await prisma.varient.findUnique({ where: { id }, include: { images: true, product: true }, });

    return result;
}

const updateOne = async (id: string, VarientData: Partial<Varient>, meta_seo: Partial<MetaSEO>): Promise<string> => {

    // let get = await prisma.varient.findUnique({ where: { id }, include: { images: true, product: true } })

    // const result = await prisma.$transaction(async transectionClient => {

    //     // meta SEO updation 
    //     const metaSEOCreation = await transectionClient.metaSEO.update({ where: { id: get?.meta_SEO_id }, data: meta_seo });

    //     //Varient updation
    //     const VarientCreation = await transectionClient.varient.update({ where: { id }, data: VarientData });

    // })

    // get = await prisma.varient.findUnique({ where: { id }, include: { attribute_group: true, category: true, meta_SEO: true } })

    return "";
}


const deleteOne = async (id: string): Promise<Varient | null> => {
    const result = await prisma.varient.delete({ where: { id } });
    return result
}




export const VarientService = { createOne, getOne, getAll, deleteOne }