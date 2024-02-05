import { faker } from "@faker-js/faker";
import prisma from "../../src/shared/prisma";

async function getAttributeGroup(attGroupCount: number){
    // image creation for category
    const imageForCategory = await prisma.image.create({
        data: {
            image_url: faker.image.avatar(),
            category_id: category.id
        }
    })



}