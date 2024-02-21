import { faker } from "@faker-js/faker";
import prisma from "../../src/shared/prisma";
import { MetaSEOSeeder } from "./metaSEO";

async function getProduct(productCount: number = 2) {

    const categories = await prisma.category.findMany({ include: { Meta_SEO: true, images: true } });

    const attributeGroup = await prisma.attributeGroup.findMany({ include: { attributes: true } });

    const attributes = await prisma.attribute.findMany({ include: { attribute_options: true } });

    const products = [faker.commerce.productName(), faker.commerce.productName(), faker.commerce.productName(), faker.commerce.productName(), faker.commerce.productName(), faker.commerce.productName(), faker.commerce.productName(), faker.commerce.productName(), faker.commerce.productName(), faker.commerce.productName()];

    // category creation 
    await Promise.all(categories?.map(async category => {

        const metaSEO = await MetaSEOSeeder.getMetaSEO(category.name, "product");

        await Promise.all(products?.map(async product => {

            const newProduct = await prisma.product.create({
                data: {
                    name: product,
                    description: faker.commerce.productDescription(),
                    attribute_group_id: attributeGroup[0]?.id,
                    meta_SEO_id: metaSEO.id,
                    sku: faker.commerce.isbn(),
                    category_id: category.id,
                    manage_stock: faker.datatype.boolean(),
                    stock_availability: faker.datatype.boolean(),
                    tax_class: faker.datatype.boolean(),
                }
            })

            const varient = await prisma.varient.create({
                data: {
                    sku: faker.commerce.isbn(),
                    price: parseFloat(faker.commerce.price({ min: 10, max: 299 })),
                    product_id: newProduct.id,
                    qty: faker.number.int({ max: 20 }),
                    visibility: faker.datatype.boolean(),
                    status: faker.datatype.boolean(),
                    weight: faker.number.float({ max: 20 }),
                }
            })

            // varient option
            for (let i = 0; i < 3; i++) {
                await Promise.all(attributes?.map(async attribute => {

                    const options = attribute.attribute_options?.map(e => e.id);

                    type ArrayElement<A> = A extends readonly (infer T)[] ? T : never;
                    type EnumEquivalent = { [K in ArrayElement<typeof options>]: K };

                    const enumEquivalent: EnumEquivalent = options.reduce((acc, current) => {
                        acc[current] = current;
                        return acc;
                    }, {} as EnumEquivalent);


                    const varientOption = await prisma.varientOption.create({
                        data: {
                            attribute_name: attribute.attribute_name,
                            varient_id: varient.id,
                            option_id: faker.helpers.enumValue(enumEquivalent)
                        }
                    })
                }))


                const image = await prisma.image.create({
                    data: {
                        image_url: faker.image.avatar(),
                        varient_id: varient.id,
                        product_id: newProduct.id
                    }
                })
            }

        }))


    }))

}

export const ProductSeeder = { getProduct };