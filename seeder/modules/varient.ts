import { faker } from "@faker-js/faker";
import prisma from "../../src/shared/prisma";

async function getAttributeGroup(attGroupCount: number){
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




}