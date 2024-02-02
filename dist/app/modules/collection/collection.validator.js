"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CollectionValidator = void 0;
const zod_1 = require("zod");
const create = zod_1.z.object({
    body: zod_1.z.object({
        collection_name: zod_1.z.string({
            required_error: `collection_name is required`,
        }),
        collection_code: zod_1.z.string({
            required_error: `collection_code is required`
        }),
        description: zod_1.z.string({
            required_error: `description is required`
        })
    }),
});
const update = zod_1.z.object({
    body: zod_1.z.object({
        collection_name: zod_1.z.string().optional(),
        collection_code: zod_1.z.string().optional(),
        description: zod_1.z.string().optional()
    }),
});
exports.CollectionValidator = { create, update };
