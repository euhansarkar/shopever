import { z } from 'zod';

const create = z.object({
  body: z.object({
    title: z.string({
      required_error: `title is required`,
    }),
    apartmentId: z.string({
      required_error: `apartment id is required`,
    }),
  }),
});

const update = z.object({
  body: z.object({
    title: z.string().optional(),
    apartmentId: z.string().optional(),
  }),
});

export const StructureValidator = { create, update };
