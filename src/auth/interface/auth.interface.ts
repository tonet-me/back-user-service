export interface IOauthGenerateToken {
  email: string;
}
export interface ILoginResult {
  accessToken: string;
  refreshToken: string;
  status?: string;
}
