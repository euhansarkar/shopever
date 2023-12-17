import { AttributeOption } from "@prisma/client";

import prisma from "../../../shared/prisma";


const updateOne = async (id: string, payload: Partial<AttributeOption>): Promise<AttributeOption> => {


    const result = await prisma.attributeOption.update({
        where: { id },
        data: payload
    })
    return result
}


export const AttributeOptionService = { updateOne }