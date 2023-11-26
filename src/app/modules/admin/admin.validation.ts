import { z } from 'zod';
import { bloodGroup, gender } from './admin.constant';

const updateAdminZodSchema = z.object({
  body: z.object({
    name: z.object({
      first_name: z.string().optional(),
      middle_name: z.string().optional(),
      last_name: z.string().optional(),
    }).optional(),
    admin: z.object({
      gender: z.enum([...gender] as [string, ...string[]]).optional(),
      date_of_birth: z.string().optional(),
      contact_no: z.string().optional(),
      emergency_contact_no: z.string().min(10, 'Emergency contact number is required').optional(),
      blood_group: z.enum([...bloodGroup] as [string, ...string[]]).optional(),
      present_address: z.string().min(1, 'Present address is required').optional(),
      permanent_address: z.string().min(1, 'Permanent address is required').optional(),
      designation: z.string().optional(),
      management_department_id: z.string().optional(),
    }).optional(),
  }).optional(),
});


export const AdminValidator = { updateAdminZodSchema };
