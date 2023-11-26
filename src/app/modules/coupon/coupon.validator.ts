import { z } from "zod";

// strict 

const keyWord = z.object({
    name: z.string({ required_error: `keyword name is required` })
})

const metaSEO = z.object({
    parent_id: z.string({ required_error: `parent id is required` }),
    meta_title: z.string({ required_error: `meta title is required` }),
    meta_description: z.string({ required_error: `meta description is required` }),
    url_key: z.string({ required_error: `url key is required` })
});

const imageURL = z.object({
    image_url: z.string({ required_error: `image URL is required` })
})

const create = z.object({
    body: z.object({
        name: z.string({ required_error: `Coupon name is required` }),
        description: z.string({ required_error: `descripotion is required` }),
        status: z.boolean({ required_error: `status is required` }),
        include_in_nav: z.boolean({ required_error: `include in nav is required` }),
        parent_id: z.number({ required_error: `parent id is required` }),
        position: z.number({ required_error: `position is required` }),
        images: z.array(imageURL),
        metaSEO: metaSEO,
        keywords: z.array(keyWord)
    })
})

// non-strict

const keyWordOptional = z.object({
    name: z.string().optional(),
    isDeleted: z.boolean().optional()
});

const metaSEOOptional = z.object({
    parent_id: z.string().optional(),
    meta_title: z.string().optional(),
    meta_description: z.string().optional(),
    url_key: z.string().optional()
});

const imageURLOptional = z.object({
    image_url: z.string().optional(),
    isDeleted: z.boolean().optional()
});

const update = z.object({
    body: z.object({
        name: z.string().optional(),
        description: z.string().optional(),
        status: z.boolean().optional(),
        include_in_nav: z.boolean().optional(),
        parent_id: z.number().optional(),
        position: z.number().optional(),
        images: z.array(imageURLOptional).optional(),
        metaSEO: metaSEOOptional.optional(),
        keywords: z.array(keyWordOptional).optional()
    })
}).nonstrict();


export const CouponValidator = { create, update };