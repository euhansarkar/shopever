import { faker } from "@faker-js/faker";
import prisma from "../../src/shared/prisma";

async function getAttributeGroup(attGroupCount: number) {
    // varient option creation 
    const varientOption = await prisma.varientOption.create({
        data: {
            attribute_name: 'value',
            varient_id: varient.id
        }
    })


}