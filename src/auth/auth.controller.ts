import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { Observable, of } from 'rxjs';
import { OtpGenerate } from 'src/common/helper/otp.generate';
import { IResponse } from 'src/common/utils/transform.response';
import { MakeOtpResult } from './interface/auth.interface';

@Controller('auth')
export class AuthController {
  constructor() {}
  @GrpcMethod('AuthService', 'MakeOtp')
  makeOtp(body): Observable<IResponse<MakeOtpResult>> {
    const code: number = OtpGenerate.make();
    console.log(code);

    return of({
      success: true,
      message: 'salam',
      data: { code },
    });
  }
}
