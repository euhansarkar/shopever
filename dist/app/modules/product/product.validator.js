"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductValidator = void 0;
const zod_1 = require("zod");
//creation
const metaSEO = zod_1.z.object({
    parent_id: zod_1.z.string({ required_error: `parent id is required` }),
    meta_title: zod_1.z.string({ required_error: `meta title is required` }),
    meta_description: zod_1.z.string({ required_error: `meta description is required` }),
    url_key: zod_1.z.string({ required_error: `url key is required` })
});
const create = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().refine(data => data.trim() !== '', { message: 'Name is required' }),
        description: zod_1.z.string().refine(data => data.trim() !== '', { message: 'Description is required' }),
        sku: zod_1.z.string().refine(data => data.trim() !== '', { message: 'SKU is required' }),
        tax_class: zod_1.z.boolean().refine(data => data !== undefined, { message: 'Tax class is required' }),
        attribute_group_id: zod_1.z.string().nullable().refine(data => data !== undefined, { message: 'Attribute group ID is required' }),
        category_id: zod_1.z.string().refine(data => data.trim() !== '', { message: 'Category ID is required' }),
        meta_seo: metaSEO,
    })
});
//updation
const metaSEOOptional = zod_1.z.object({
    parent_id: zod_1.z.string().optional(),
    meta_title: zod_1.z.string().optional(),
    meta_description: zod_1.z.string().optional(),
    url_key: zod_1.z.string().optional()
});
const update = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().optional(),
        description: zod_1.z.string().optional(),
        sku: zod_1.z.string().optional(),
        tax_class: zod_1.z.boolean().optional(),
        attribute_group_id: zod_1.z.string().optional(),
        category_id: zod_1.z.string().optional(),
        meta_seo: metaSEOOptional.optional(),
    }),
});
exports.ProductValidator = { create, update };
