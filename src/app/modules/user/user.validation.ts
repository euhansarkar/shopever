import { z } from 'zod';
import { bloodGroup, gender } from './user.constant';

const createStudentZodSchema = z.object({
  body: z.object({
    password: z.string().optional(),
    name: z.object({
      firstName: z.string({
        required_error: 'First name is required',
      }),
      middleName: z.string().optional(),
      lastName: z.string({
        required_error: 'Last name is required',
      }),
    }),
    guardian: z.object({
      fatherName: z.string({
        required_error: 'Father name is required',
      }),
      fatherOccupation: z.string({
        required_error: 'Father occupation is required',
      }),
      fatherContactNo: z.string({
        required_error: 'Father contact number is required',
      }),
      motherName: z.string({
        required_error: 'Mother name is required',
      }),
      motherOccupation: z.string({
        required_error: 'Mother occupation is required',
      }),
      motherContactNo: z.string({
        required_error: 'Mother contact number is required',
      }),
      address: z.string({
        required_error: 'Guardian address is required',
      }),
    }),
    localGuardian: z.object({
      name: z.string({
        required_error: 'Local guardian name is required',
      }),
      occupation: z.string({
        required_error: 'Local guardian occupation is required',
      }),
      contactNo: z.string({
        required_error: 'Local guardian contact number is required',
      }),
      address: z.string({
        required_error: 'Local guardian address is required',
      }),
    }),
    student: z.object({
      gender: z.enum([...gender] as [string, ...string[]], {
        required_error: 'Gender is required',
      }),
      dateOfBirth: z.string({
        required_error: 'Date of birth is required',
      }),
      email: z
        .string({
          required_error: 'Email is required',
        })
        .email(),
      contactNo: z.string({
        required_error: 'Contact number is required',
      }),
      emergencyContactNo: z.string({
        required_error: 'Emergency contact number is required',
      }),
      bloodGroup: z.enum([...bloodGroup] as [string, ...string[]]).optional(),
      presentAddress: z.string({
        required_error: 'Present address is required',
      }),
      permanentAddress: z.string({
        required_error: 'Permanent address is required',
      }),
      academicSemesterId: z.string({
        required_error: 'Academic semester id is required',
      }),
      academicDepartmentId: z.string({
        required_error: 'Academic department id is required',
      }),
      academicFacultyId: z.string({
        required_error: 'Academic faculty id is required',
      }),
      profileImage: z.string().optional(),
    }),
  }),
});

const createFacultyZodSchema = z.object({
  body: z.object({
    password: z.string().optional(),
    name: z.object({
      firstName: z.string({
        required_error: 'First name is required',
      }),
      middleName: z.string().optional(),
      lastName: z.string({
        required_error: 'Last name is required',
      }),
    }),
    faculty: z.object({
      gender: z.enum([...gender] as [string, ...string[]], {
        required_error: 'Gender is required',
      }),
      dateOfBirth: z.string({
        required_error: `date fo birth is required`,
      }),
      email: z.string().email('Invalid email address'),
      contactNo: z.string({
        required_error: `contact is required`,
      }),
      emergencyContactNo: z
        .string()
        .min(10, 'Emergency contact number is required'),
      bloodGroup: z.enum([...bloodGroup] as [string, ...string[]]).optional(),
      presentAddress: z.string().min(1, 'Present address is required'),
      permanentAddress: z.string().min(1, 'Permanent address is required'),
      academicDepartmentId: z.string().uuid('Invalid academic department ID'),
      academicFacultyId: z.string().uuid('Invalid academic faculty ID'),
      designation: z.string({
        required_error: `designation is required`,
      }),
    }),
  }),
});

const createAdminZodSchema = z.object({
  body: z.object({
    password: z.string().optional(),
    name: z.object({
      firstName: z.string({
        required_error: 'First name is required',
      }),
      middleName: z.string().optional(),
      lastName: z.string({
        required_error: 'Last name is required',
      }),
    }),
    admin: z.object({
      gender: z.enum([...gender] as [string, ...string[]], {
        required_error: 'Gender is required',
      }),
      dateOfBirth: z.string({
        required_error: `date fo birth is required`,
      }),
      email: z.string().email('Invalid email address'),
      contactNo: z.string({
        required_error: `contact is required`,
      }),
      emergencyContactNo: z
        .string()
        .min(10, 'Emergency contact number is required'),
      bloodGroup: z.enum([...bloodGroup] as [string, ...string[]]).optional(),
      presentAddress: z.string().min(1, 'Present address is required'),
      permanentAddress: z.string().min(1, 'Permanent address is required'),
      designation: z.string({
        required_error: `designation is required`,
      }),
      managementDepartmentId: z.string({
        required_error: `management department id is required`,
      }),
    }),
  }),
});

export const UserValidation = {
  createStudentZodSchema,
  createFacultyZodSchema,
  createAdminZodSchema,
};
