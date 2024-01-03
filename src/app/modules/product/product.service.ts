import { MetaSEO, Product, Image, Prisma } from '@prisma/client';
import prisma from "../../../shared/prisma";
import { IPaginationOptions } from '../../../interfaces/pagination';
import { IGenericResponse } from '../../../interfaces/common';
import { IProductAttribute, IProductFilterRequest } from './product.interface';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { ProductRelationalFields, ProductRelationalFieldsMapper, ProductSearchableFields } from './product.constant';

const createOne = async (productData: Product, meta_seo: MetaSEO): Promise<Product | null> => {

    const result = await prisma.$transaction(async transectionClient => {

        // meta SEO creation 
        const metaSEOCreation = await transectionClient.metaSEO.create({ data: meta_seo });

        //product creation
        const productCreation = await transectionClient.product.create({ data: { ...productData, meta_SEO_id: metaSEOCreation.id } });


        return productCreation

    })

    const get = await prisma.product.findUnique({ where: { id: result.id }, include: { attribute_group: true, category: true, meta_SEO: true } })

    return get;
}

const getAll = async (filters: IProductFilterRequest, options: IPaginationOptions): Promise<IGenericResponse<Product[]>> => {


    const { limit, page, skip } = paginationHelpers.calculatePagination(options);
    const { searchTerm, ...filterData } = filters;

    const andConditions = [];

    if (searchTerm) {
        andConditions.push({
            OR: ProductSearchableFields.map(field => ({
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
                if (ProductRelationalFields.includes(key)) {
                    return {
                        [ProductRelationalFieldsMapper[key]]: {
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

    const whereConditions: Prisma.ProductWhereInput = andConditions.length > 0 ? { AND: andConditions } : {}

    const result = await prisma.product.findMany({
        include: { attribute_group: true, category: true, meta_SEO: true, varients: { include: { varient_options: true, images: true } } },
        where: whereConditions, skip, take: limit, orderBy: options.sortBy && options.sortOrder ? { [options.sortBy]: options.sortOrder } : { created_at: "desc" }
    })

    const total = await prisma.product.count({
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

const getOne = async (id: string): Promise<Product | null> => {
    const result = await prisma.product.findUnique({ where: { id }, include: { attribute_group: true, category: true, meta_SEO: true, varients: { include: { varient_options: { include: { options: true } }, images: true } } } });

    return result;
}

const updateOne = async (id: string, productData: Partial<Product>, meta_seo: Partial<MetaSEO>): Promise<Product | null> => {

    let get = await prisma.product.findUnique({ where: { id }, include: { attribute_group: true, category: true, meta_SEO: true } })

    const result = await prisma.$transaction(async transectionClient => {

        // meta SEO updation 
        if (meta_seo) {
            const metaSEOCreation = await transectionClient.metaSEO.update({ where: { id: get?.meta_SEO_id }, data: meta_seo });
        }

        //product updation
        const productCreation = await transectionClient.product.update({ where: { id }, data: productData });

    })

    get = await prisma.product.findUnique({ where: { id }, include: { attribute_group: true, category: true, meta_SEO: true } })

    return get;
}


const deleteOne = async (id: string): Promise<Product | null> => {
    const result = await prisma.product.delete({ where: { id } });
    return result
}




export const ProductService = { createOne, getOne, getAll, updateOne, deleteOne }