import { Coupon, Image, Keyword, MetaSEO, Prisma } from "@prisma/client";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { IGenericResponse } from "../../../interfaces/common";
import { IPaginationOptions } from "../../../interfaces/pagination";
import prisma from "../../../shared/prisma";
import { asyncForEach } from '../../../shared/utils';
import { ICouponFilterRequest } from "./coupon.interface";
import { CouponRelationalFields, CouponRelationalFieldsMapper, CouponSearchableFields } from "./coupon.constant";


const createOne = async (CouponData: Coupon, keywords: Keyword[], images: Image[], metaSEO: MetaSEO): Promise<Coupon> => {

    const result = await prisma.$transaction(async (transactionClient) => {
        // meta SEO creation 
        const metaSEOCreation = await transactionClient.metaSEO.create({ data: metaSEO });

        for (const keyword of keywords) {
            //@ts-ignore
            const data = { meta_SEO_id: metaSEOCreation.id, ...keyword };
            const keywordCreation = await transactionClient.keyword.create({ data });
        }

        //@ts-ignore
        const data = { meta_SEO_id: metaSEOCreation.id, ...CouponData };
        const CouponCreation = await transactionClient.coupon.create({ data, 
            // include: { Meta_SEO: true, images: true } 
        });

        for (const img of images) {
            //@ts-ignore
            const data = { Coupon_id: CouponCreation.id, ...img };
            const imageCreation = await transactionClient.image.create({ data });
        }

        return CouponCreation;
    });

    const get = await prisma.coupon.findUnique({ where: { id: result.id }, 
        // include: { images: true, Meta_SEO: true } 
    })
    return result;
}

const getAll = async (filters: ICouponFilterRequest, options: IPaginationOptions): Promise<IGenericResponse<Coupon[]>> => {
    const { limit, page, skip } = paginationHelpers.calculatePagination(options);
    const { searchTerm, ...filterData } = filters;

    const andConditions = [];

    if (searchTerm) {
        andConditions.push({
            OR: CouponSearchableFields.map(field => ({
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
                if (CouponRelationalFields.includes(key)) {
                    return {
                        [CouponRelationalFieldsMapper[key]]: {
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

    const whereConditions: Prisma.CouponWhereInput = andConditions.length > 0 ? { AND: andConditions } : {}

    const result = await prisma.coupon.findMany({
        // include: {Meta_SEO: true,images: true},
        where: whereConditions,
        skip,
        take: limit,
        orderBy: options.sortBy && options.sortOrder ? { [options.sortBy]: options.sortOrder } : { created_at: "desc" },

    })

    const total = await prisma.coupon.count({
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

const getOne = async (id: string): Promise<Coupon | null> => {
    const result = await prisma.coupon.findUnique({ where: { id },  // include: { images: true, Meta_SEO: true } 
    });
    return result;
}

const updateOne = async (id: string, CouponData: Partial<Coupon>, keywords: Partial<Keyword[]>, images: Partial<Image[]>, metaSEO: Partial<MetaSEO>): Promise<Coupon | null> => {

    const result = await prisma.$transaction(async (transactionClient) => {
        // get seo
        const getCoupon = await transactionClient.coupon.findUnique({ where: { id } });

        // meta SEO creation 
        // const metaSEOCreation = await transactionClient.metaSEO.update({ where: { id: getCoupon?.meta_SEO_id! }, data: metaSEO });


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

        const CouponCreation = await transactionClient.coupon.update({ where: { id }, data: CouponData });



        if (images && images.length > 0) {

            const deletedImages = images.filter(image => image?.image_url && image.isDeleted);

            const newImages = images.filter(image => image?.image_url && !image.isDeleted);

            await asyncForEach(deletedImages, async (image: Image) => {
                // await transactionClient.image.deleteMany({ where: { Coupon_id: image.Coupon_id } })
            })

            await asyncForEach(newImages, async (image: Image) => {
                await transactionClient.image.create({ data: { ...image, 
                    // Coupon_id: getCoupon?.id 
                } })
            })

        }

        return CouponCreation;
    });

    const get = await prisma.coupon.findUnique({ where: { id },     /// include: { images: true, Meta_SEO: true } 
    })

    return get;

}

const deleteOne = async (id: string): Promise<Coupon | null> => {

    const getCoupon = await prisma.coupon.findUnique({ where: { id } });

    const result = await prisma.$transaction(async (transactionClient) => {

        // meta SEO 
        //@ts-ignore
        const metaSEODeletion = await transactionClient.metaSEO.delete({ where: { id: getCoupon?.meta_SEO_id } });

        // image deletion
        // const imageDeletion = await transactionClient.image.deleteMany({ where: { Coupon_id: getCoupon?.id } });

        // keyword deletion
        const keywordDeletion = await transactionClient.keyword.deleteMany({ where: { meta_SEO_id: metaSEODeletion.id } });

        const CouponDeletion = await transactionClient.coupon.delete({ where: { id } })

        return CouponDeletion;
    });
    return result;
}

export const CouponService = { createOne, getAll, getOne, updateOne, deleteOne }