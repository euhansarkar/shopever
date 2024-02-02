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
const varientSchema = zod_1.z.object({
    attribute_id: zod_1.z.string({ required_error: `attribute_id is required` }),
    attribute_name: zod_1.z.string({ required_error: `attribute name is required` }),
    option_id: zod_1.z.string({ required_error: `option_id is required` }),
    varient_id: zod_1.z.string({ required_error: `varient id is required` }),
});
const orderedProductSchema = zod_1.z.object({
    product_id: zod_1.z.string({ required_error: `productId is required` }),
    varients: zod_1.z.array(varientSchema)
});
const varientSchemaOptional = zod_1.z.object({
    attribute_id: zod_1.z.string().optional(),
    attribute_name: zod_1.z.string().optional(),
    option_id: zod_1.z.string().optional(),
    varient_id: zod_1.z.string().optional(),
});
const orderedProductSchemaOptional = zod_1.z.object({
    product_id: zod_1.z.string().optional(),
    varients: zod_1.z.array(varientSchemaOptional)
});
const create = zod_1.z.object({
    body: zod_1.z.object({
        shipping_address: createShippingAddressSchema,
        billing_address: createBillingAddressSchema,
        paymentMethodId: zod_1.z.string({ required_error: `payment method is required` }),
        shippingMethodId: zod_1.z.string({ required_error: `shipping address id is required` }),
        products: zod_1.z.array(orderedProductSchema)
    })
});
const update = zod_1.z.object({
    body: zod_1.z.object({
        shipping_address: updateShippingAddressSchema,
        billing_address: updateBillingAddressSchema,
        paymentMethodId: zod_1.z.string({}).optional(),
        shippingMethodId: zod_1.z.string({}).optional(),
        products: zod_1.z.array(orderedProductSchemaOptional)
    })
});
exports.OrderValidator = { create, update };
