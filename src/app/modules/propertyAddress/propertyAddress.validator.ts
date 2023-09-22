import { z } from 'zod';

const create = z.object({
  body: z.object({
    street: z.string({
      required_error: `street is required`,
    }),
    zipCode: z.number({
      required_error: `zipcode is required`,
    }),
    coordinateId: z.string({
      required_error: `coordinate id is requited`,
    }),
    propertyId: z.string({
      required_error: `property id is required`,
    }),
    cityId: z.string({
      required_error: `city id is required`,
    }),
  }),
});

const update = z.object({
  body: z.object({
    street: z.string().optional(),
    zipCode: z.number().optional(),
    coordinateId: z.string().optional(),
    propertyId: z.string().optional(),
    cityId: z.string().optional(),
  }),
});

export const PropertyAddressValidator = { create, update };
