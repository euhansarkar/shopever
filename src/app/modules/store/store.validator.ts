import { z } from 'zod';

const create = z.object({
    body: z.object({
        name: z.string().default('evershop').refine((data) => !!data, { message: 'Name is required' }),
        description: z.string(),
        logo: z.string(),
        phoneNumber: z.string().default('01234-567890').refine((data) => !!data, { message: 'Phone number is required' }),
        email: z.string().default('evershop@gmail.com').refine((data) => !!data, { message: 'Email is required' }),
        country: z.string().default('bangladesh').refine((data) => !!data, { message: 'Country is required' }),
        city: z.string().default('rajshahi').refine((data) => !!data, { message: 'City is required' }),
        postalCode: z.string().default('6000').refine((data) => !!data, { message: 'Postal code is required' }),
    })
});

const update = z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    logo: z.string().optional(),
    phoneNumber: z.string().optional(),
    email: z.string().optional(),
    country: z.string().optional(),
    city: z.string().optional(),
    postalCode: z.string().optional(),
});



export const StoreValidator = { create, update };
