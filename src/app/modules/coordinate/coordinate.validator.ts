import { z } from 'zod';

const create = z.object({
  body: z.object({
    lattitude: z.number({
      required_error: `lattitude is required`,
    }),
    longitude: z.number({
      required_error: `longitude is required`,
    }),
  }),
});

const update = z.object({
  body: z.object({
    lattitude: z.number().optional(),
    longitude: z.number().optional(),
  }),
});

export const CoordinateValidator = { create, update };
