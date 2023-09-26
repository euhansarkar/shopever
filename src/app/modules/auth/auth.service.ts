import {
  ILogin,
  ILoginResponse,
  IRefreshTokenResponse,
} from './auth.interface';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';
import prismaWithExtensions from '../../prismaMiddlwares/prismaWithExtensions';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import { jwtHelpers } from '../../../helpers/jwtHelpers';

const login = async (data: ILogin): Promise<ILoginResponse> => {
  const { id, password } = data;

  // check user exists
  const isUserExist = await prismaWithExtensions.user.isUserExists(id);

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, `user not found`);
  }

  // match password
  const isPasswordMatched = await prismaWithExtensions.user.isPasswordMatched(
    password,
    isUserExist.password!
  );

  if (!isPasswordMatched) {
    throw new ApiError(httpStatus.UNAUTHORIZED, `password is incorrect`);
  }

  // create access token and refresh token

  const accessToken = jwtHelpers.createToken(
    { id: isUserExist?.id, role: isUserExist?.role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  const refreshToken = jwtHelpers.createToken(
    { id: isUserExist?.id, role: isUserExist?.role },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  );

  return {
    accessToken,
    refreshToken,
    needsPasswordChange: true,
  };
};

const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
  // verify token
  let verifiedToken = null;
  try {
    verifiedToken = jwtHelpers.verifyToken(
      token,
      config.jwt.refresh_secret as Secret
    );
  } catch (err) {
    throw new ApiError(httpStatus.FORBIDDEN, `invalid refresh token`);
  }

  const { id } = verifiedToken;

  // check is user deleted or not on database
  const isUserExist = await prismaWithExtensions.user.isUserExists(id);

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, `user not found`);
  }
  // generate new Token
  const newAccessToken = jwtHelpers.createToken(
    {
      id: isUserExist.id,
      role: isUserExist.role,
    },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  return { accessToken: newAccessToken };
};

export const AuthService = { login, refreshToken };
