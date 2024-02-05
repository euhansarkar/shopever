import prisma from "../../src/shared/prisma";

async function getAttributeGroup(attGroupCount: number = 1) {
    // attribute group creation
    const attributeGroup = await prisma.attributeGroup.create({
        data: { group_name: "default" }
    })

}

export const AttributeGroupSeeder = { getAttributeGroup }