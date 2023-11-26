import { MetaSEO, Product, Image, Prisma, ProductAttribute, ProductAttributeValue } from '@prisma/client';
import prisma from "../../../shared/prisma";
import { IPaginationOptions } from '../../../interfaces/pagination';
import { IGenericResponse } from '../../../interfaces/common';
import { IProductAttribute, IProductFilterRequest } from './product.interface';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { ProductRelationalFields, ProductRelationalFieldsMapper, ProductSearchableFields } from './product.constant';
import { asyncForEach } from '../../../shared/utils';

const createOne = async (productData: Product, images: Image[], meta_seo: MetaSEO, product_attributes: IProductAttribute[]): Promise<Product | null> => {

    const result = await prisma.$transaction(async transectionClient => {

        // meta SEO creation 
        const metaSEOCreation = await transectionClient.metaSEO.create({ data: meta_seo });

        //product creation
        const productCreation = await transectionClient.product.create({ data: { ...productData, meta_SEO_id: metaSEOCreation.id } });

        //images creation 
        for (const img of images) {
            const data = { ...img, product_id: productCreation.id }
            const imageCreation = await transectionClient.image.create({ data });
        }

        // product attribute creation
        for (const att of product_attributes) {
            const { product_attribute_values, ...attData } = att;

            const productAtt = await transectionClient.productAttribute.create({ data: { ...attData, product_id: productCreation.id } });

            // product attribute value creation
            for (const val of product_attribute_values) {
                await transectionClient.productAttributeValue.create({ data: { ...val, product_attribute_id: productAtt.id } });
            }
        }

        return productCreation

    })

    const get = await prisma.product.findUnique({ where: { id: result.id }, include: { attribute_group: true, category: true, images: true, meta_SEO: true, product_attributes: { include: { attribute: true, ProductAttributeValue: true } } } })

    console.log(get);

    return get;
}

const getAll = async (filters: IProductFilterRequest, options: IPaginationOptions): Promise<IGenericResponse<Product[]>> => {

    const { limit, page, skip } = paginationHelpers.calculatePagination(options);
    const { searchTerm, ...filterData } = filters;

    const andConditions = [];

    if (searchTerm) {
        OR: ProductSearchableFields.map(field => ({
            [field]: {
                contains: searchTerm,
                mode: "insensitive"
            }
        }))
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

    const result = await prisma.product.findMany({ include: { attribute_group: true, category: true, images: true, meta_SEO: true, product_attributes: { include: { attribute: true, ProductAttributeValue: true } } }, where: whereConditions, skip, take: limit, orderBy: options.sortBy && options.sortOrder ? { [options.sortBy]: options.sortOrder } : { created_at: "desc" } })

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
    const result = await prisma.product.findUnique({ where: { id }, include: { attribute_group: true, category: true, images: true, meta_SEO: true, product_attributes: { include: { attribute: true, ProductAttributeValue: true } } }, });

    return result;
}

const updateOne = async (id: string, productData: Partial<Product>, images: Partial<Image[]>, meta_seo: Partial<MetaSEO>, product_attributes: IProductAttribute[]): Promise<Product | null> => {

    let get = await prisma.product.findUnique({ where: { id }, include: { attribute_group: true, category: true, images: true, meta_SEO: true, product_attributes: { include: { attribute: true, ProductAttributeValue: true } } } })

    const result = await prisma.$transaction(async transectionClient => {

        // meta SEO updation 
        const metaSEOCreation = await transectionClient.metaSEO.update({ where: { id: get?.meta_SEO_id }, data: meta_seo });

        //product updation
        const productCreation = await transectionClient.product.update({ where: { id }, data: productData });

        //images updation  
        if (images && images.length > 0) {
            const deleteImages = images.filter(image => image?.image_url && image.isDeleted);

            const newImages = images.filter(image => image?.image_url && !image.isDeleted);

            await asyncForEach(deleteImages, async (image: Image) => {
                await transectionClient.image.deleteMany({ where: { product_id: id } })
            })

            await asyncForEach(newImages, async (image: Image) => {
                await transectionClient.image.create({ data: image })
            })
        }


        // product attribute updation

        if (product_attributes && product_attributes.length > 0) {


            // for (const att of product_attributes) {
            //     const { product_attribute_values, ...attData } = att;

            //     const productAtt = await transectionClient.productAttribute.update({ where: { id: get?. }, data: attData });

            //     // product attribute value creation
            //     for (const val of product_attribute_values) {
            //         await transectionClient.productAttributeValue.create({ data: { ...val, product_attribute_id: productAtt.id } });
            //     }
            // }

            // const deleteProductAtts = product_attributes.filter(att => att.attribute_id && att.is_deleted);

            // const newProductAtts = product_attributes.filter(att => att.attribute_id && !att.is_deleted);

            // await asyncForEach(deleteProductAtts, async (productAtt: ProductAttribute) => {
            //     await transectionClient.productAttribute.deleteMany({ where: { product_id: productAtt.product_id } });
            // })

            // await asyncForEach(newProductAtts, async (productAtt: ProductAttribute) => {
            //     await transectionClient.productAttribute.create({ data: productAtt })
            // })


            // product attribute value updation
            // for (const productAtt of product_attributes) {

            //     const deleteProductAttVals = productAtt.product_attribute_values.filter(productAttVal => productAttVal.attribute_option_id && productAttVal.is_deleted)

            //     const newProductAttVals = productAtt.product_attribute_values.filter(productAttVal => productAttVal.attribute_option_id && !productAttVal.is_deleted);

            //     await asyncForEach(deleteProductAttVals, async (productAttVal: ProductAttribute) => {
            //         await transectionClient.productAttributeValue.deleteMany({ where: { product_attribute_id: get.} });
            //     })

            //     await asyncForEach(newProductAtts, async (productAtt: ProductAttribute) => {
            //         await transectionClient.productAttribute.create({ data: productAtt })
            //     })

            // }
        }
    })

    get = await prisma.product.findUnique({ where: { id }, include: { attribute_group: true, category: true, images: true, meta_SEO: true, product_attributes: { include: { attribute: true, ProductAttributeValue: true } } } })

    return get;
}


const deleteOne = async (id: string): Promise<Product | null> => {
    const result = await prisma.product.delete({ where: { id } });
    return result
}




export const ProductService = { createOne, getOne, getAll, updateOne, deleteOne }