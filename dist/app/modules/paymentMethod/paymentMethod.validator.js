"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentMethodValidator = void 0;
const zod_1 = require("zod");
const create = zod_1.z.object({
    body: zod_1.z.object({
        method_name: zod_1.z.string({
            required_error: `method_name is required`,
        }),
        method_code: zod_1.z.string({
            required_error: `method code is required`
        })
    }),
});
const update = zod_1.z.object({
    body: zod_1.z.object({
        method_name: zod_1.z.string().optional(),
        method_code: zod_1.z.string().optional()
    }),
});
exports.PaymentMethodValidator = { create, update };
