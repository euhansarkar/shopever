"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerValidator = void 0;
const zod_1 = require("zod");
const updateCustomerZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        password: zod_1.z.string().optional(),
        name: zod_1.z.object({
            first_name: zod_1.z.string().optional(),
            middle_name: zod_1.z.string().optional(),
            last_name: zod_1.z.string().optional(),
        }).optional(),
        customer: zod_1.z.object({
            email: zod_1.z.string().email('Invalid email address').optional(),
        }).optional(),
    }).optional(),
});
exports.CustomerValidator = { updateCustomerZodSchema };
