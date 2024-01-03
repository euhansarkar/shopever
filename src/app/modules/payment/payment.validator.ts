import { z } from 'zod';

const create = z.object({
    body: z.object({
        price: z.number({
            required_error: `price is required`,
        })
    }),
});

export const PaymentValidator = { create };
