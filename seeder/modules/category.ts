import { faker } from "@faker-js/faker";
import prisma from "../../src/shared/prisma";
import { MetaSEOSeeder } from "./metaSEO";
import { ImageSeeder } from "./image";

async function getCategory(categoryCount: number = 2) {

    const categories = ['man', 'woman', 'baby'];


    // category creation 
    await Promise.all(categories?.map(async category => {

        const metaSEO = await MetaSEOSeeder.getMetaSEO(category);

        const categoryCreation = await prisma.category.create({
            data: {
                name: category,
                description: faker.lorem.lines(10),
                include_in_nav: faker.datatype.boolean(),
                position: faker.number.int({max: 20}),
                status: faker.datatype.boolean(),
                meta_SEO_id: metaSEO.id,

            }
        })

        const image = await ImageSeeder.getImage(categoryCreation.id);
    }))

}

export const CategorySeeder = { getCategory }