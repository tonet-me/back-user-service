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
