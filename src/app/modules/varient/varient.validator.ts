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


const metaSEOOptional = z.object({
    parent_id: z.string().optional(),
    meta_title: z.string().optional(),
    meta_description: z.string().optional(),
    url_key: z.string().optional()
});


const update = z.object({
    body: z.object({
        name: z.string().optional(),
        description: z.string().optional(),
        sku: z.string().optional(),
        tax_class: z.boolean().optional(),
        attribute_group_id: z.string().optional(),
        category_id: z.string().optional(),
        meta_seo: metaSEOOptional.optional(),
    }),
});


export const VarientValidator = { create, update }
