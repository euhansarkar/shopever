import { Prisma, Varient } from '@prisma/client';
import { Request } from 'express';
import { FileUploadHeler } from '../../../helpers/fileUploadHelper';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from "../../../shared/prisma";
import { VarientRelationalFields, VarientRelationalFieldsMapper, VarientSearchableFields } from './varient.constant';
import { IVarientFilterRequest } from './varient.interface';

const createOne = async (req: Request): Promise<Varient | null> => {

    const files = req.file as IFile;

    console.log(`from varient creation`, files);

    //! now it files getting an object you have to conevert to array here
    // if files will be an array 
    const images: ICloudinary[] = [];
    await Promise.all([files].map(async file => {
        const uploadedImage = await FileUploadHeler.uploadToCloudinary(file) as ICloudinary;
        images.push(uploadedImage);
    }))


    const { varient_options, ...varientData } = req.body;

    const result = await prisma.$transaction(async transectionClient => {


        //Varient creation
        const varientCreation = await transectionClient.varient.create({ data: varientData });

        //Varient Option Creation
        for (const varient of varient_options) {
            const data = { ...varient, varient_id: varientCreation.id }
            const myRes = await transectionClient.varientOption.create({ data });
        }

        //images creation 
        for (const img of images) {
            console.log(`this is image`, img);
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
        andConditions.push({
            OR: VarientSearchableFields.map(field => ({
                [field]: {
                    contains: searchTerm,
                    mode: "insensitive"
                }
            }))
        })
    }

    if (Object.keys(filterData).length > 0) {
        andConditions.push({
            AND: Object.keys(filterData).map(key => {
                if (VarientRelationalFields.includes(key)) {
                    console.log(`from varient service`, key);
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

    const result = await prisma.varient.findMany(
        {
            include: { images: true, product: true, varient_options: true },
            where: whereConditions, skip, take: limit, orderBy: options.sortBy && options.sortOrder ? { [options.sortBy]: options.sortOrder } : { created_at: "desc" }
        })

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
    const result = await prisma.varient.findUnique({
        where: { id },
        include: { images: true, product: true, varient_options: true },
    });

    return result;
}


const updateOne = async (req: Request): Promise<Varient | null> => {

    const files = req.file as IFile;

    console.log(`getting the file`, files);
    console.log(`getting body`, req.body);
    const id = req?.params?.id;

    // if files will be an array 
    const images: ICloudinary[] = [];
    await Promise.all([files].map(async file => {
        const uploadedImage = await FileUploadHeler.uploadToCloudinary(file) as ICloudinary;
        images.push(uploadedImage);
    }))


    const { varient_options, ...varientData } = req.body;

    const result = await prisma.$transaction(async transectionClient => {

        // Varient updation
        const varientUpdation = await transectionClient.varient.update({ where: { id: req?.params?.id }, data: varientData });


        //Varient Option updation
        const getVarientOptions = await transectionClient.varientOption.findMany({ where: { varient_id: id } });
        for (const varientOption of getVarientOptions) {
            await transectionClient.varientOption.delete({ where: { id: varientOption.id } })
        }

        for (const varient of varient_options) {
            const data = { ...varient, varient_id: id }
            const myRes = await transectionClient.varientOption.create({ data });
        }

        // const getImages = await transectionClient.image.findMany({ where: { varient_id: id } })
        // for (const img of getImages) {
        //     await transectionClient.image.delete({ where: { id: img.id } });
        // }

        // for (const img of images) {
        //     console.log(`this is image`, img);
        //     const data = { image_url: img.secure_url, varient_id: id }
        //     await transectionClient.image.create({ data });

        // }


        //images updation 
        const getImages = await transectionClient.image.findMany({ where: { varient_id: id } })
        for (const img of getImages) {
            await transectionClient.image.delete({ where: { id: img.id } });
        }

        for (const img of images) {
            console.log(`this is image`, img);
            const data = { image_url: img.secure_url, varient_id: id }
            await transectionClient.image.create({ data });

        }

        return varientUpdation;

    })

    const get = await prisma.varient.findUnique({ where: { id: result.id }, include: { product: true, images: true } });

    return get;
}




const deleteOne = async (id: string): Promise<Varient | null> => {
    const result = await prisma.varient.delete({ where: { id } });
    return result
}




export const VarientService = { createOne, getOne, getAll, updateOne, deleteOne }