"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderValidator = void 0;
const zod_1 = require("zod");
const createShippingAddressSchema = zod_1.z.object({
    name: zod_1.z.string({ required_error: `name is required` }),
    phone_number_1: zod_1.z.string({ required_error: `phone number 1 is required` }),
    phone_number_2: zod_1.z.string({ required_error: `phone number 2 is required` }),
    country: zod_1.z.string({ required_error: `country is required` }),
    state: zod_1.z.string({ required_error: `state is required` }),
    city: zod_1.z.string({ required_error: `city is required` }),
    location: zod_1.z.string({ required_error: `location is required` })
});
const createBillingAddressSchema = zod_1.z.object({
    name: zod_1.z.string({ required_error: `name is required` }),
    phone_number_1: zod_1.z.string({ required_error: `phone number 1 is required` }),
    phone_number_2: zod_1.z.string({ required_error: `phone number 2 is required` }),
    country: zod_1.z.string({ required_error: `country is required` }),
    state: zod_1.z.string({ required_error: `state is required` }),
    city: zod_1.z.string({ required_error: `city is required` }),
    location: zod_1.z.string({ required_error: `location is required` })
});
const updateShippingAddressSchema = zod_1.z.object({
    name: zod_1.z.string({}).optional(),
    phone_number_1: zod_1.z.string({}).optional(),
    phone_number_2: zod_1.z.string({}).optional(),
    country: zod_1.z.string({}).optional(),
    state: zod_1.z.string({}).optional(),
    city: zod_1.z.string({}).optional(),
    location: zod_1.z.string({}).optional(),
});
const updateBillingAddressSchema = zod_1.z.object({
    name: zod_1.z.string({}).optional(),
    phone_number_1: zod_1.z.string({}).optional(),
    phone_number_2: zod_1.z.string({}).optional(),
    country: zod_1.z.string({}).optional(),
    state: zod_1.z.string({}).optional(),
    city: zod_1.z.string({}).optional(),
    location: zod_1.z.string({}).optional(),
});
const create = zod_1.z.object({
    body: zod_1.z.object({
        shipping_address: createShippingAddressSchema,
        billing_address: createBillingAddressSchema,
        paymentMethodId: zod_1.z.string({ required_error: `payment method is required` }),
        shippingMethodId: zod_1.z.string({ required_error: `shipping address id is required` }),
    })
});
const update = zod_1.z.object({
    body: zod_1.z.object({
        shipping_address: updateShippingAddressSchema,
        billing_address: updateBillingAddressSchema,
        paymentMethodId: zod_1.z.string({}).optional(),
        shippingMethodId: zod_1.z.string({}).optional(),
    })
});
exports.OrderValidator = { create, update };
