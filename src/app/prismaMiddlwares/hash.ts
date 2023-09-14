import { Prisma } from '@prisma/client';
import bcrypt from 'bcrypt';

export const encryptPassword: Prisma.Middleware = async (
  params: Prisma.MiddlewareParams,
  next
) => {
  if (params.action === 'create' && params.model === 'User') {
    let user = params.args.data;
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(user.password, salt);
    user.password = hash;
  }
  return await next(params);
};
