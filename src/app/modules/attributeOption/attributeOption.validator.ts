import { z } from 'zod';


const update = z.object({
    is_deleted: z.string().optional(),
    option_text: z.string().optional(),
});

export const AttributeOptionValidator = { update };
