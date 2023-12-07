import { z } from "zod";

//creation


const metaSEO = z.object({
    parent_id: z.string({ required_error: `parent id is required` }),
    meta_title: z.string({ required_error: `meta title is required` }),
    meta_description: z.string({ required_error: `meta description is required` }),
    url_key: z.string({ required_error: `url key is required` })
});


const create = z.object({
    body: z.object({
        name: z.string().refine(data => data.trim() !== '', { message: 'Name is required' }),
        description: z.string().refine(data => data.trim() !== '', { message: 'Description is required' }),
        sku: z.string().refine(data => data.trim() !== '', { message: 'SKU is required' }),
        tax_class: z.boolean().refine(data => data !== undefined, { message: 'Tax class is required' }),
        attribute_group_id: z.string().nullable().refine(data => data !== undefined, { message: 'Attribute group ID is required' }),
        category_id: z.string().refine(data => data.trim() !== '', { message: 'Category ID is required' }),
        meta_seo: metaSEO,
    })
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


export const ProductValidator = { create, update }
