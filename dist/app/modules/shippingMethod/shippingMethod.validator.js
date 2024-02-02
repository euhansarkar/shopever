"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShippingMethodValidator = void 0;
const zod_1 = require("zod");
const create = zod_1.z.object({
    body: zod_1.z.object({
        method_name: zod_1.z.string({
            required_error: `method_name is required`,
        }),
        method_code: zod_1.z.string({
            required_error: `method code is required`
        }),
        cost: zod_1.z.number({
            required_error: `cost is required`
        })
    }),
});
const update = zod_1.z.object({
    body: zod_1.z.object({
        method_name: zod_1.z.string().optional(),
        method_code: zod_1.z.string().optional(),
        cost: zod_1.z.number().optional(),
    }),
});
exports.ShippingMethodValidator = { create, update };
