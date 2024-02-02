"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryValidator = void 0;
const zod_1 = require("zod");
// strict 
const keyWord = zod_1.z.object({
    name: zod_1.z.string({ required_error: `keyword name is required` })
});
const metaSEO = zod_1.z.object({
    parent_id: zod_1.z.string({ required_error: `parent id is required` }),
    meta_title: zod_1.z.string({ required_error: `meta title is required` }),
    meta_description: zod_1.z.string({ required_error: `meta description is required` }),
    url_key: zod_1.z.string({ required_error: `url key is required` })
});
const create = zod_1.z.object({
    // body: z.object({
    name: zod_1.z.string({ required_error: `category name is required` }),
    description: zod_1.z.string({ required_error: `descripotion is required` }),
    status: zod_1.z.boolean({ required_error: `status is required` }),
    include_in_nav: zod_1.z.boolean({ required_error: `include in nav is required` }),
    parent_id: zod_1.z.string().optional(),
    position: zod_1.z.number({ required_error: `position is required` }),
    metaSEO: metaSEO,
    keywords: zod_1.z.array(keyWord)
    // })
});
// non-strict
const keyWordOptional = zod_1.z.object({
    name: zod_1.z.string().optional(),
    isDeleted: zod_1.z.boolean().optional()
});
const metaSEOOptional = zod_1.z.object({
    parent_id: zod_1.z.string().optional(),
    meta_title: zod_1.z.string().optional(),
    meta_description: zod_1.z.string().optional(),
    url_key: zod_1.z.string().optional()
});
const imageURLOptional = zod_1.z.object({
    image_url: zod_1.z.string().optional(),
    isDeleted: zod_1.z.boolean().optional()
});
const update = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().optional(),
        description: zod_1.z.string().optional(),
        status: zod_1.z.boolean().optional(),
        include_in_nav: zod_1.z.boolean().optional(),
        parent_id: zod_1.z.number().optional(),
        position: zod_1.z.number().optional(),
        images: zod_1.z.array(imageURLOptional).optional(),
        metaSEO: metaSEOOptional.optional(),
        keywords: zod_1.z.array(keyWordOptional).optional()
    })
}).nonstrict();
exports.CategoryValidator = { create, update };
