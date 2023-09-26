import { z } from 'zod';

const login = z.object({
  body: z.object({
    id: z.string({
      required_error: `user id is required`,
    }),
    password: z.string({
      required_error: `user password is required`,
    }),
  }),
});

const refreshToken = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: `refresh token is required`,
    }),
  }),
});

export const AuthValidator = { login, refreshToken };
