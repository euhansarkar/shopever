import { z } from 'zod';

const create = z.object({
  body: z.object({
    title: z.string({
      required_error: `title is required`,
    }),
    countryId: z.string({
      required_error: `country id is required`,
    }),
  }),
});

const update = z.object({
  body: z.object({
    title: z.string().optional(),
    countryId: z.string().optional(),
  }),
});

export const CityValidator = { create, update };
