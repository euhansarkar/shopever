import { faker } from "@faker-js/faker";
import prisma from "../../src/shared/prisma";

async function getAttributeGroup(attGroupCount: number){
    // meta seo creation for category
    const metaSEOForCategory = await prisma.metaSEO.create({
        data: {
            parent_id: faker.string.uuid(),
            meta_description: faker.lorem.paragraph(),
            meta_title: faker.lorem.text(),
            url_key: faker.lorem.sentence(),
        }
    })


}