import { z } from 'zod';

const create = z.object({
    body: z.object({
        group_name: z.string({
            required_error: `group_name is required`,
        }),
    }),
});

const update = z.object({
    body: z.object({
        group_name: z.string().optional(),
    }),
});

export const OrderValidator = { create, update };
