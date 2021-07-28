import { Observable } from 'rxjs';
import { IResponse } from 'src/common/utils/transform.response';

// export interface IAuthService {
//   makeOtp(data: IMakeOtpRequest): Observable<IResponse<MakeOtpResult>>;
// }

export interface IMakeOtpRequest {
  phoneNumber: string;
}

export interface MakeOtpResult {
  code: number;
}
