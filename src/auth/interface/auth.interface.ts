export interface IMakeOtpRequest {
  phoneNumber: string;
}

export interface IMakeOtpResult {
  code: number;
}

/**
 * check verification code
 */

export interface ILoginOtp {
  phoneNumber: string;
  code: number;
}

export interface ILoginOtpResult {
  accessToken: string;
}
