import { z } from "zod";

//creation


const varientOption = z.object({
    attribute_name: z.string({ required_error: `attribute name is required` }),
    option_id: z.string({ required_error: `attribute id is required` }),
})

const create = z.object({
    sku: z.string({ required_error: `sku is required` }),
    qty: z.number({ required_error: `qty is required` }),
    price: z.number({ required_error: `price is required` }),
    weight: z.number({ required_error: `weight is required` }),
    status: z.boolean({ required_error: `status is required` }),
    visibility: z.boolean({ required_error: `visibility is required` }),
    product_id: z.string({ required_error: `product_id is required` }),
    varient_options: z.array(varientOption),
});


//updation

const varientOptionOptional = z.object({
    attribute_name: z.string().optional(),
    option_id: z.string().optional(),
})

const update = z.object({
    sku: z.string().optional(),
    qty: z.number().optional(),
    price: z.number().optional(),
    weight: z.number().optional(),
    status: z.boolean().optional(),
    visibility: z.boolean().optional(),
    varient_options: z.array(varientOptionOptional),
});

export const VarientValidator = { create, update }
