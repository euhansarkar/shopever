"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VarientValidator = void 0;
const zod_1 = require("zod");
//creation
const varientOption = zod_1.z.object({
    attribute_name: zod_1.z.string({ required_error: `attribute name is required` }),
    option_id: zod_1.z.string({ required_error: `attribute id is required` }),
});
const create = zod_1.z.object({
    sku: zod_1.z.string({ required_error: `sku is required` }),
    qty: zod_1.z.number({ required_error: `qty is required` }),
    price: zod_1.z.number({ required_error: `price is required` }),
    weight: zod_1.z.number({ required_error: `weight is required` }),
    status: zod_1.z.boolean({ required_error: `status is required` }),
    visibility: zod_1.z.boolean({ required_error: `visibility is required` }),
    product_id: zod_1.z.string({ required_error: `product_id is required` }),
    varient_options: zod_1.z.array(varientOption),
});
//updation
const varientOptionOptional = zod_1.z.object({
    attribute_name: zod_1.z.string().optional(),
    option_id: zod_1.z.string().optional(),
});
const update = zod_1.z.object({
    sku: zod_1.z.string().optional(),
    qty: zod_1.z.number().optional(),
    price: zod_1.z.number().optional(),
    weight: zod_1.z.number().optional(),
    status: zod_1.z.boolean().optional(),
    visibility: zod_1.z.boolean().optional(),
    varient_options: zod_1.z.array(varientOptionOptional),
});
exports.VarientValidator = { create, update };
