import { CACHE_MANAGER, Controller, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GrpcMethod } from '@nestjs/microservices';
import { Observable, of } from 'rxjs';
import { OtpGenerate } from 'src/common/helper/otp.generate';
import { IResponse } from 'src/common/utils/transform.response';
import { AuthService } from './auth.service';
import {
  ILoginOtp,
  ILoginOtpResult,
  IMakeOtpRequest,
  MakeOtpResult,
} from './interface/auth.interface';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @GrpcMethod('AuthService', 'MakeOtp')
  public async makeOtp(
    body: IMakeOtpRequest,
  ): Promise<Observable<IResponse<MakeOtpResult>>> {
    const code: number = OtpGenerate.make();
    await this.authService.saveOtp(body.phoneNumber, code);
    return of({
      success: true,
      message: 'ارسال شد',
      data: { code },
    });
  }

  @GrpcMethod('AuthService', 'LoginOtp')
  public async loginOtp(
    body: ILoginOtp,
  ): Promise<Observable<IResponse<ILoginOtpResult>>> {
    let valid = false;
    const code = await this.authService.getOtp(body.phoneNumber);
    if (code === body.code) {
      valid = true;
      this.authService.removeOtp(body.phoneNumber);
    }

    return of({
      success: true,
      message: 'ارسال شد',
      data: { jwt: '|asdasd', status: String(valid) },
    });
  }
}
