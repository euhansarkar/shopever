import { z } from 'zod';

const updateCustomerZodSchema = z.object({
  body: z.object({
    name: z.object({
      first_name: z.string().optional(),
      middle_name: z.string().optional(),
      last_name: z.string().optional(),
    }).optional(),
    customer: z.object({
      email: z.string().email('Invalid email address').optional(),
    }).optional(),
  }).optional(),
});

export const CustomerValidator = { updateCustomerZodSchema };
