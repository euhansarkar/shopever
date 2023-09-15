import { z } from 'zod';

const create = z.object({
  body: z.object({
    title: z.string({
      required_error: `title is required`,
    }),
    academicFacultyId: z.string({
      required_error: `academic faculty id is required`,
    }),
  }),
});

const update = z.object({
  body: z.object({
    title: z.string().optional(),
    academicFacultyId: z.string().optional(),
  }),
});

export const AcademicDepartmentValidator = { create, update };
