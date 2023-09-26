import { JwtPayload } from 'jsonwebtoken';

export type ILogin = {
  id: string;
  password: string;
};

export type ILoginResponse = {
  accessToken: string;
  refreshToken?: string;
  needsPasswordChange: boolean;
};

export type IRefreshTokenResponse = {
  accessToken: string;
};
