import { z } from 'zod';

const create = z.object({
  body: z.object({
    link: z.string({
      required_error: `link is required`,
    }),
    propertyId: z.string({
      required_error: `property id is required`,
    }),
    structureId: z.string({
      required_error: `structure id is required`,
    }),
  }),
});

const update = z.object({
  body: z.object({
    link: z.string().optional(),
    propertyId: z.string().optional(),
    structureId: z.string().optional(),
  }),
});

export const FloorPlanImageValidator = { create, update };
