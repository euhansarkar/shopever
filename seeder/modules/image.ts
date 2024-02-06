import { faker } from "@faker-js/faker";
import prisma from "../../src/shared/prisma";

async function getImage(categoryId: string) {
    // image creation for category
    const image = await prisma.image.create({
        data: {
            image_url: faker.image.avatar(),
            category_id: categoryId
        }
    })

    return image

}

export const ImageSeeder = { getImage }