import { z } from 'zod';

const create = z.object({
  body: z.object({
    price: z.number({
      required_error: `price is required`,
    }),
    sqft: z.number({
      required_error: `sqft is required`,
    }),
    availableDate: z.string({
      required_error: `available date is required`,
    }),
    structureId: z.string({
      required_error: `structure id is required`,
    }),
    apartmentId: z.string({
      required_error: `apartment id is required`,
    }),
  }),
});

const update = z.object({
  body: z.object({
    price: z.number().optional(),
    sqft: z.number().optional(),
    availableDate: z.string().optional(),
    structureId: z.string().optional(),
    apartmentId: z.string().optional(),
  }),
});

export const UnitValidator = { create, update };
