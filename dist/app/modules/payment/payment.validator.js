"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentValidator = void 0;
const zod_1 = require("zod");
const create = zod_1.z.object({
    body: zod_1.z.object({
        price: zod_1.z.number({
            required_error: `price is required`,
        })
    }),
});
exports.PaymentValidator = { create };
