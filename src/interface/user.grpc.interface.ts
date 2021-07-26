import { Observable } from 'rxjs';

export interface IAuthService {
  makeOtp(data: IMakeOtpRequest): Observable<IMakeOtpResponse>;
}

export interface IMakeOtpRequest {
  phoneNumber: string;
}

export interface IMakeOtpResponse {
  code: string;
  // jwt: string;
  status?: string;
}
