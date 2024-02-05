import { faker } from "@faker-js/faker";
import prisma from "../../src/shared/prisma";

async function getProduct(productCount: number) {

    // attribute group creation
    const attributeGroup = await prisma.attributeGroup.create({
        data: { group_name: "default" }
    })

    const getAttGroup = await prisma.attribute.findMany({
        include: { attribute_options: true }
    })

    // attribute creation
    const attribute = await prisma.attribute.create({
        data: {
            attribute_name: "color",
            attribute_code: faker.random.alphaNumeric(),
            type: "multiselect",
            attribute_group_id: attributeGroup.id,
            display_on_frontend: faker.datatype.boolean(),
            is_filterable: faker.datatype.boolean(),
            is_required: faker.datatype.boolean(),
            sort_order: faker.number.int(),
        }
    });

    const attribute2 = await prisma.attribute.create({
        data: {
            attribute_name: "size",
            attribute_code: faker.random.alphaNumeric(),
            type: "multiselect",
            attribute_group_id: attributeGroup.id,
            display_on_frontend: faker.datatype.boolean(),
            is_filterable: faker.datatype.boolean(),
            is_required: faker.datatype.boolean(),
            sort_order: faker.number.int(),
        }
    });


    // attribute option creation
    const attributeOption = await prisma.attributeOption.create({
        data: {
            option_text: faker.color.human(),
            attribute_id: attribute?.id,
        }
    })


    enum Category { categoryOne = "man", catgoryTwo = "woman", categoryThree = "baby" }

    // meta seo creation for category
    const metaSEOForCategory = await prisma.metaSEO.create({
        data: {
            parent_id: faker.string.uuid(),
            meta_description: faker.lorem.paragraph(),
            meta_title: faker.lorem.text(),
            url_key: faker.lorem.sentence(),
        }
    })


    // category creation 
    const category = await prisma.category.create({
        data: {
            name: faker.helpers.enumValue(Category),
            description: faker.lorem.lines(10),
            include_in_nav: faker.datatype.boolean(),
            position: faker.number.int(),
            status: faker.datatype.boolean(),
            meta_SEO_id: metaSEOForCategory.id,

        }
    })

    // image creation for category
    const imageForCategory = await prisma.image.create({
        data: {
            image_url: faker.image.avatar(),
            category_id: category.id
        }
    })

    // meta seo creation for product
    const metaSEOForProduct = await prisma.metaSEO.create({
        data: {
            parent_id: faker.string.uuid(),
            meta_description: faker.lorem.paragraph(),
            meta_title: faker.lorem.text(),
            url_key: faker.lorem.sentence(),
        }
    })

    // product creation 
    const product = await prisma.product.create({
        data: {
            name: faker.commerce.productName(),
            description: faker.commerce.productDescription(),
            attribute_group_id: attributeGroup.id,
            meta_SEO_id: metaSEOForProduct.id,
            sku: faker.commerce.isbn(),
            category_id: category.id,
            manage_stock: faker.datatype.boolean(),
            stock_availability: faker.datatype.boolean(),
            tax_class: faker.datatype.boolean(),
        }
    })


    // varient creation 
    const varient = await prisma.varient.create({
        data: {
            sku: faker.commerce.isbn(),
            price: parseFloat(faker.commerce.price({ min: 10, max: 299 })),
            product_id: product.id,
            qty: faker.number.int(),
            visibility: faker.datatype.boolean(),
            status: faker.datatype.boolean(),
            weight: faker.number.float(),
        }
    })

    // varient option creation 
    const varientOption = await prisma.varientOption.create({
        data: {
            attribute_name: 'value',
            varient_id: varient.id
        }
    })


    // image creation for varient - products
    const imageForVarient = await prisma.image.create({
        data: {
            image_url: faker.image.avatar(),
            product_id: product.id
        }
    })

}

export const AdminSeeder = { getAdmin: getProduct };