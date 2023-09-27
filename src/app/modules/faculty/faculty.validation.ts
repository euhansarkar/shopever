import { z } from 'zod';
import { bloodGroup, gender } from './faculty.constant';

const updateFacultyZodSchema = z.object({
  body: z.object({
    name: z
      .object({
        firstName: z.string().optional(),
        middleName: z.string().optional(),
        lastName: z.string().optional(),
      })
      .optional(),
    faculty: z
      .object({
        gender: z.enum([...gender] as [string, ...string[]]).optional(),
        dateOfBirth: z.string().optional(),
        email: z.string().email().optional(),
        contactNo: z.string().optional(),
        emergencyContactNo: z.string().optional(),
        bloodGroup: z.enum([...bloodGroup] as [string, ...string[]]).optional(),
        presentAddress: z.string().optional(),
        permanentAddress: z.string().optional(),
        academicDepartmentId: z.string().optional(),
        designation: z.string().optional(),
        academicFacultyId: z.string().optional(),
        profileImage: z.string().optional(),
      })
      .optional(),
  }),
});

export const FacultyValidator = { updateFacultyZodSchema };