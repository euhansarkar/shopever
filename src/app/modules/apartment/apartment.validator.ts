import { z } from 'zod';

const create = z.object({
  body: z.object({
    title: z.string({
      required_error: `title is required`,
    }),
    propertyId: z.string({
      required_error: `property id is required`,
    }),
  }),
});

const update = z.object({
  body: z.object({
    title: z.string().optional(),
    propertyId: z.string().optional(),
  }),
});

export const ApartmentValidator = { create, update };
