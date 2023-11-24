import { z } from 'zod';
import { bloodGroup, gender } from './user.constant';

const createCustomerZodSchema = z.object({
  body: z.object({
    password: z.string().optional(),
    name: z.object({
      first_name: z.string({
        required_error: 'First name is required',
      }),
      middle_name: z.string().optional(),
      last_name: z.string({
        required_error: 'Last name is required',
      }),
    }),
    customer: z.object({
      email: z.string().email('Invalid email address'),
    }),
  }),
});


const createAdminZodSchema = z.object({
  body: z.object({
    password: z.string().optional(),
    name: z.object({
      first_name: z.string({
        required_error: 'First name is required',
      }),
      middle_name: z.string().optional(),
      last_name: z.string({
        required_error: 'Last name is required',
      }),
    }),
    admin: z.object({
      gender: z.enum([...gender] as [string, ...string[]], {
        required_error: 'Gender is required',
      }),
      date_of_birth: z.string({
        required_error: `date fo birth is required`,
      }),
      email: z.string().email('Invalid email address'),
      contact_no: z.string({
        required_error: `contact is required`,
      }),
      emergency_contact_no: z
        .string()
        .min(10, 'Emergency contact number is required'),
      blood_group: z.enum([...bloodGroup] as [string, ...string[]]).optional(),
      present_address: z.string().min(1, 'Present address is required'),
      permanent_address: z.string().min(1, 'Permanent address is required'),
      designation: z.string({
        required_error: `designation is required`,
      }),
      management_department_id: z.string({
        required_error: `management department id is required`,
      }),
    }),
  }),
});

export const UserValidation = {
  createCustomerZodSchema,
  createAdminZodSchema,
};
