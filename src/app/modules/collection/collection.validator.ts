import { z } from 'zod';

const create = z.object({
    body: z.object({
        collection_name: z.string({
            required_error: `collection_name is required`,
        }),
        collection_code: z.string({
            required_error: `collection_code is required`
        }),
        description: z.string({
            required_error: `description is required`
        })
    }),
});

const update = z.object({
    body: z.object({
        collection_name: z.string().optional(),
        collection_code: z.string().optional(),
        description: z.string().optional()
    }),
});

export const CollectionValidator = { create, update };
