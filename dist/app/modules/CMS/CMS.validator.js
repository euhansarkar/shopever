"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CMSValidator = void 0;
const zod_1 = require("zod");
const metaSEO = zod_1.z.object({
    parent_id: zod_1.z.string({ required_error: `parent id is required` }),
    meta_title: zod_1.z.string({ required_error: `meta title is required` }),
    meta_description: zod_1.z.string({ required_error: `meta description is required` }),
    url_key: zod_1.z.string({ required_error: `url key is required` })
});
const create = zod_1.z.object({
    body: zod_1.z.object({
        layout: zod_1.z.string({ required_error: `layout type is required` }),
        name: zod_1.z.string({ required_error: `name id is required` }),
        content: zod_1.z.string({ required_error: `content is required` }),
        metaSEO: metaSEO,
        status: zod_1.z.boolean({ required_error: `status is required` })
    })
});
const metaSEOOptional = zod_1.z.object({
    parent_id: zod_1.z.string().optional(),
    meta_title: zod_1.z.string().optional(),
    meta_description: zod_1.z.string().optional(),
    url_key: zod_1.z.string().optional()
});
const update = zod_1.z.object({
    body: zod_1.z.object({
        layout: zod_1.z.string().optional(),
        name: zod_1.z.string().optional(),
        content: zod_1.z.string().optional(),
        metaSEO: metaSEOOptional,
        status: zod_1.z.boolean().optional()
    })
});
exports.CMSValidator = { create, update };
