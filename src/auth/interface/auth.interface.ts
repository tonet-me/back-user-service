export interface IMakeOtpRequest {
  phoneNumber: string;
}

export interface MakeOtpResult {
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
  status: string;
  jwt: string;
}
