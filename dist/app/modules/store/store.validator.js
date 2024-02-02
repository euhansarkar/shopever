"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoreValidator = void 0;
const zod_1 = require("zod");
const create = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().default('evershop').refine((data) => !!data, { message: 'Name is required' }),
        description: zod_1.z.string(),
        logo: zod_1.z.string(),
        phoneNumber: zod_1.z.string().default('01234-567890').refine((data) => !!data, { message: 'Phone number is required' }),
        email: zod_1.z.string().default('evershop@gmail.com').refine((data) => !!data, { message: 'Email is required' }),
        country: zod_1.z.string().default('bangladesh').refine((data) => !!data, { message: 'Country is required' }),
        city: zod_1.z.string().default('rajshahi').refine((data) => !!data, { message: 'City is required' }),
        postalCode: zod_1.z.string().default('6000').refine((data) => !!data, { message: 'Postal code is required' }),
    })
});
const update = zod_1.z.object({
    name: zod_1.z.string().optional(),
    description: zod_1.z.string().optional(),
    logo: zod_1.z.string().optional(),
    phoneNumber: zod_1.z.string().optional(),
    email: zod_1.z.string().optional(),
    country: zod_1.z.string().optional(),
    city: zod_1.z.string().optional(),
    postalCode: zod_1.z.string().optional(),
});
exports.StoreValidator = { create, update };
