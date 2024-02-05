import { faker } from "@faker-js/faker";
import prisma from "../../src/shared/prisma";

async function getAttributeGroup(attGroupCount: number) {
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

}