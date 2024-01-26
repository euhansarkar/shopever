import { z } from "zod";

const createShippingAddressSchema = z.object({
    name: z.string({ required_error: `name is required` }),
    phone_number_1: z.string({ required_error: `phone number 1 is required` }),
    phone_number_2: z.string({ required_error: `phone number 2 is required` }),
    country: z.string({ required_error: `country is required` }),
    state: z.string({ required_error: `state is required` }),
    city: z.string({ required_error: `city is required` }),
    location: z.string({ required_error: `location is required` })
});

const createBillingAddressSchema = z.object({
    name: z.string({ required_error: `name is required` }),
    phone_number_1: z.string({ required_error: `phone number 1 is required` }),
    phone_number_2: z.string({ required_error: `phone number 2 is required` }),
    country: z.string({ required_error: `country is required` }),
    state: z.string({ required_error: `state is required` }),
    city: z.string({ required_error: `city is required` }),
    location: z.string({ required_error: `location is required` })
});


const updateShippingAddressSchema = z.object({
    name: z.string({}).optional(),
    phone_number_1: z.string({}).optional(),
    phone_number_2: z.string({}).optional(),
    country: z.string({}).optional(),
    state: z.string({}).optional(),
    city: z.string({}).optional(),
    location: z.string({}).optional(),
});


const updateBillingAddressSchema = z.object({
    name: z.string({}).optional(),
    phone_number_1: z.string({}).optional(),
    phone_number_2: z.string({}).optional(),
    country: z.string({}).optional(),
    state: z.string({}).optional(),
    city: z.string({}).optional(),
    location: z.string({}).optional(),
});





const create = z.object({
    body: z.object({
        shipping_address: createShippingAddressSchema,
        billing_address: createBillingAddressSchema,
        paymentMethodId: z.string({ required_error: `payment method is required` }),
        shippingMethodId: z.string({ required_error: `shipping address id is required` }),
    })
});



const update = z.object({
    body: z.object({
        shipping_address: updateShippingAddressSchema,
        billing_address: updateBillingAddressSchema,
        paymentMethodId: z.string({}).optional(),
        shippingMethodId: z.string({}).optional(),
    })
});


export const OrderValidator = { create, update }


