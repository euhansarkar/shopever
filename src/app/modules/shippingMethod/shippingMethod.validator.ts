import { z } from 'zod';

const create = z.object({
    body: z.object({
        method_name: z.string({
            required_error: `method_name is required`,
        }),
        method_code: z.string({
            required_error: `method code is required`
        }),
        cost: z.number({
            required_error: `cost is required`
        })
    }),
});

const update = z.object({
    body: z.object({
        method_name: z.string().optional(),
        method_code: z.string().optional(),
        cost: z.number().optional(),
    }),
});

export const ShippingMethodValidator = { create, update };
