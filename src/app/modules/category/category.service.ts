import { Category, Image, Keyword, MetaSEO, Prisma, PrismaClient } from "@prisma/client";
import prisma from "../../../shared/prisma";
import { ICategoryFilterRequest } from "./category.interface";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { IGenericResponse } from "../../../interfaces/common";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { categoryRelationalFields, categoryRelationalFieldsMapper, categorySearchableFields } from "./category.constant";
import { asyncForEach } from '../../../shared/utils';


const createOne = async (categoryData: Category, keywords: Keyword[], images: Image[], metaSEO: MetaSEO): Promise<Category> => {

    const result = await prisma.$transaction(async (transactionClient) => {
        // meta SEO creation 
        const metaSEOCreation = await transactionClient.metaSEO.create({ data: metaSEO });

        for (const keyword of keywords) {
            //@ts-ignore
            const data = { meta_SEO_id: metaSEOCreation.id, ...keyword };
            const keywordCreation = await transactionClient.keyword.create({ data });
        }

        //@ts-ignore
        const data = { meta_SEO_id: metaSEOCreation.id, ...categoryData };
        const categoryCreation = await transactionClient.category.create({ data, include: { Meta_SEO: true, images: true } });

        for (const img of images) {
            //@ts-ignore
            const data = { category_id: categoryCreation.id, ...img };
            const imageCreation = await transactionClient.image.create({ data });
        }

        return categoryCreation;
    });

    const get = await prisma.category.findUnique({ where: { id: result.id }, include: { images: true, Meta_SEO: true } })
    return result;
}

const getAll = async (filters: ICategoryFilterRequest, options: IPaginationOptions): Promise<IGenericResponse<Category[]>> => {
    const { limit, page, skip } = paginationHelpers.calculatePagination(options);
    const { searchTerm, ...filterData } = filters;

    const andConditions = [];

    if (searchTerm) {
        andConditions.push({
            OR: categorySearchableFields.map(field => ({
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
                if (categoryRelationalFields.includes(key)) {
                    return {
                        [categoryRelationalFieldsMapper[key]]: {
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

    const whereConditions: Prisma.CategoryWhereInput = andConditions.length > 0 ? { AND: andConditions } : {}

    const result = await prisma.category.findMany({
        include: {
            Meta_SEO: true,
            images: true
        },
        where: whereConditions,
        skip,
        take: limit,
        orderBy: options.sortBy && options.sortOrder ? { [options.sortBy]: options.sortOrder } : { created_at: "desc" },

    })

    const total = await prisma.category.count({
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

const getOne = async (id: string): Promise<Category | null> => {
    const result = await prisma.category.findUnique({ where: { id }, include: { images: true, Meta_SEO: true } });
    return result;
}

const updateOne = async (id: string, categoryData: Partial<Category>, keywords: Partial<Keyword[]>, images: Partial<Image[]>, metaSEO: Partial<MetaSEO>): Promise<Category | null> => {

    const result = await prisma.$transaction(async (transactionClient) => {
        // get seo
        const getCategory = await transactionClient.category.findUnique({ where: { id } });

        // meta SEO creation 
        const metaSEOCreation = await transactionClient.metaSEO.update({ where: { id: getCategory?.meta_SEO_id! }, data: metaSEO });


        if (keywords && keywords.length > 0) {

            const deleteKeywords = keywords.filter(keyword => keyword?.name && keyword.isDeleted);

            const newKeywords = keywords.filter(keyword => keyword?.name && !keyword.isDeleted);


            await asyncForEach(deleteKeywords, async (keyword: Keyword) => {
                await transactionClient.keyword.deleteMany({ where: { meta_SEO_id: keyword.meta_SEO_id } })
            })

            await asyncForEach(newKeywords, async (keyword: Keyword) => {
                await transactionClient.keyword.create({ data: keyword })
            })
        }

        const categoryCreation = await transactionClient.category.update({ where: { id }, data: categoryData });



        if (images && images.length > 0) {

            const deletedImages = images.filter(image => image?.image_url && image.isDeleted);

            const newImages = images.filter(image => image?.image_url && !image.isDeleted);

            await asyncForEach(deletedImages, async (image: Image) => {
                await transactionClient.image.deleteMany({ where: { category_id: image.category_id } })
                console.log(`this will deleted`, image)
            })

            await asyncForEach(newImages, async (image: Image) => {
                await transactionClient.image.create({ data: { ...image, category_id: getCategory?.id } })
                console.log(`this will added`, image);
            })

        }

        return categoryCreation;
    });

    const get = await prisma.category.findUnique({ where: { id }, include: { images: true, Meta_SEO: true } })

    return get;

}

const deleteOne = async (id: string): Promise<Category | null> => {

    const getCategory = await prisma.category.findUnique({ where: { id } });

    const result = await prisma.$transaction(async (transactionClient) => {

        // meta SEO 
        //@ts-ignore
        const metaSEODeletion = await transactionClient.metaSEO.delete({ where: { id: getCategory?.meta_SEO_id } });

        // image deletion
        const imageDeletion = await transactionClient.image.deleteMany({ where: { category_id: getCategory?.id } });

        // keyword deletion
        const keywordDeletion = await transactionClient.keyword.deleteMany({ where: { meta_SEO_id: metaSEODeletion.id } });

        const categoryDeletion = await transactionClient.category.delete({ where: { id } })

        return categoryDeletion;
    });
    return result;
}

export const CategoryService = { createOne, getAll, getOne, updateOne, deleteOne }