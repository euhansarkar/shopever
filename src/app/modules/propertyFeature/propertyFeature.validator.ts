import { z } from 'zod';

const create = z.object({
  body: z.object({
    bedRooms: z.number({
      required_error: `bed rooms is required`,
    }),
    bathRooms: z.number({
      required_error: `bath rooms is required`,
    }),
    squreFootage: z.number({
      required_error: `squre footage is required`,
    }),
    lotSize: z.number({
      required_error: `lot size is required`,
    }),
    yearBuild: z.number({
      required_error: `year is required`,
    }),
    garage: z.boolean({
      required_error: `garage is required`,
    }),
    garageCapacity: z.number({
      required_error: `garage capacity is required`,
    }),
    swimingPool: z.number({
      required_error: `swiming pool is required`,
    }),
    firePlace: z.number({
      required_error: `fireplace is required`,
    }),
    structureId: z.string({
      required_error: `structured id is required`,
    }),
  }),
});

const update = z.object({
  body: z.object({
    bedRooms: z.number().optional(),
    bathRooms: z.number().optional(),
    squreFootage: z.number().optional(),
    lotSize: z.number().optional(),
    yearBuild: z.number().optional(),
    garage: z.boolean().optional(),
    garageCapacity: z.number().optional(),
    swimingPool: z.number().optional(),
    firePlace: z.number().optional(),
    structureId: z.string().optional(),
  }),
});

export const PropertyFeatureValidator = { create, update };
