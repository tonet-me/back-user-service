import { User } from 'src/user/schema/user.schema';

export interface IOauthGenerateToken {
  email: string;
  oauthProvider: string;
}
export interface ILoginResult {
  accessToken: string;
  refreshToken: string;
  status?: string;
  oauthRegistered?: boolean;
  oauthProvider?: string;
}

export interface IGetRefreshToken {
  refreshToken: string;
}

export interface ICheckEmailBeforRegisterResponse {
  email: string;
  registered: boolean;
}

export interface IRegisterWithEmailRequest {
  email: string;
  password: string;
  code: number;
}

export interface ICheckEmailBeforRegisterRequest {
  email: string;
}
export interface ILoginWithEmailRequest {
  email: string;
  password: string;
}

export interface ICheckEmailAndPassword {
  user: User;
  success: boolean;
}
