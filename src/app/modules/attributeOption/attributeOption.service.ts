import { AttributeOption } from "@prisma/client";

import prisma from "../../../shared/prisma";


const updateOne = async (id: string, payload: Partial<AttributeOption>): Promise<AttributeOption> => {

    console.log(id, payload);

    const result = await prisma.attributeOption.update({
        where: { id },
        data: payload
    })
    console.log(result);
    return result
}


export const AttributeOptionService = { updateOne }