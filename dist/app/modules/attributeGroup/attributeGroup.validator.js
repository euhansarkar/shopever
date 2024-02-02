"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttributeGroupValidator = void 0;
const zod_1 = require("zod");
const create = zod_1.z.object({
    body: zod_1.z.object({
        group_name: zod_1.z.string({
            required_error: `group_name is required`,
        }),
    }),
});
const update = zod_1.z.object({
    body: zod_1.z.object({
        group_name: zod_1.z.string().optional(),
    }),
});
exports.AttributeGroupValidator = { create, update };
