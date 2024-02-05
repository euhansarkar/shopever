import { faker } from "@faker-js/faker";
import prisma from "../../src/shared/prisma";
import { AttributeOption } from "./attributeOption";

async function getAttribute(attGroupCount: number = 1) {

    // get attribute group 
    const getAttGroup = await prisma.attributeGroup.findMany({});

    const selectedAtt = [['color', ['red', 'black', 'white', 'yellow']], ['size', ['S', 'M', 'XL', 'XXL']]];

    await Promise.all(selectedAtt?.map(async att => {

        // attribute creation
        const attribute = await prisma.attribute.create({
            data: {
                attribute_name: att[0] as string,
                attribute_code: faker.string.nanoid(),
                type: "multiselect",
                attribute_group_id: getAttGroup?.[0]?.id,
                display_on_frontend: faker.datatype.boolean(),
                is_filterable: faker.datatype.boolean(),
                is_required: faker.datatype.boolean(),
                sort_order: faker.number.int({ max: 20 }),
            }
        });

        const arr = att[1] as string[];
        // attribute option creation
        await AttributeOption.getAttributeOption(attribute.id, arr);

    }))


}

export const AttributeSeeder = { getAttribute }