import { faker } from "@faker-js/faker";
import prisma from "../../src/shared/prisma";

async function getMetaSEO(name: string, type: "product" | "category") {
    // meta seo creation for category
    if (type === "category") {
        const metaSEO = await prisma.metaSEO.create({
            data: {
                parent_id: faker.string.uuid(),
                meta_description: faker.lorem.paragraph(),
                meta_title: name,
                url_key: faker.lorem.sentence(),
            }
        })
        return metaSEO;
    } else {
        const metaSEO = await prisma.metaSEO.create({
            data: {
                parent_id: faker.string.uuid(),
                meta_description: faker.lorem.paragraph(),
                meta_title: name,
                url_key: faker.lorem.sentence(),
            }
        })
        return metaSEO;
    }


}

export const MetaSEOSeeder = { getMetaSEO }