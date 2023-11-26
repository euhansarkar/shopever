import { z } from "zod";

const metaSEO = z.object({
    parent_id: z.string({ required_error: `parent id is required` }),
    meta_title: z.string({ required_error: `meta title is required` }),
    meta_description: z.string({ required_error: `meta description is required` }),
    url_key: z.string({ required_error: `url key is required` })
});


const create = z.object({
    body: z.object({
        layout: z.string({ required_error: `layout type is required` }),
        name: z.string({ required_error: `name id is required` }),
        content: z.string({ required_error: `content is required` }),
        metaSEO: metaSEO,
        status: z.boolean({ required_error: `status is required` })
    })
});

const metaSEOOptional = z.object({
    parent_id: z.string().optional(),
    meta_title: z.string().optional(),
    meta_description: z.string().optional(),
    url_key: z.string().optional()
});

const update = z.object({
    body: z.object({
        layout: z.string().optional(),
        name: z.string().optional(),
        content: z.string().optional(),
        metaSEO: metaSEOOptional,
        status: z.boolean().optional()
    })
})


export const CMSValidator = { create, update };