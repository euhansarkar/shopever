import { z } from 'zod';

const create = z.object({
  body: z.object({
    title: z.string({
      required_error: `title is required`,
    }),
    year: z.string({
      required_error: `year is required`,
    }),
    code: z.string({
      required_error: `code is required`,
    }),
    startMonth: z.string({
      required_error: `start month is required`,
    }),
    endMonth: z.string({
      required_error: `end month is required`,
    }),
  }),
});

const update = z.object({
  body: z.object({
    title: z.string().optional(),
    year: z.string().optional(),
    code: z.string().optional(),
    startMonth: z.string().optional(),
    endMonth: z.string().optional(),
  }),
});

export const AcademicSemesterValidator = { create, update };
