import { MetaSEO, Product, Image } from '@prisma/client';
import prisma from "../../../shared/prisma";

const createProduct = async (productData: Product, images: Image[], meta_seo: MetaSEO, product_attributes: any): Promise<string> => {

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

    return "product created";
}


export const ProductService = { createProduct }