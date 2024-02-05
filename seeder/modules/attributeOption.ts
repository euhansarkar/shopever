import { faker } from "@faker-js/faker";
import prisma from "../../src/shared/prisma";

async function getAttributeOption(attributeId: string, attOptions: string[]) {

    await Promise.all(attOptions?.map(async attOption => {
        // attribute option creation
        await prisma.attributeOption.create({
            data: {
                option_text: attOption,
                attribute_id: attributeId,
            }
        })
    }))

}

export const AttributeOption = { getAttributeOption }