import { z } from 'zod';

const create = z.object({
    body: z.object({
        method_name: z.string({
            required_error: `method_name is required`,
        }),
        method_code: z.string({
            required_error: `method code is required`
        })
    }),
});

const update = z.object({
    body: z.object({
        method_name: z.string().optional(),
        method_code: z.string().optional()
    }),
});

export const PaymentMethodValidator = { create, update };
