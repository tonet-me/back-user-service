import { Controller, ForbiddenException } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { OtpGenerate } from 'src/common/helper/otp.generate';
import { IResponse } from 'src/common/utils/transform.response';
import { AuthService } from './auth.service';
import {
  ILoginOtp,
  ILoginOtpResult,
  IMakeOtpRequest,
  MakeOtpResult,
} from './interface/auth.interface';
import { Responser } from 'src/common/utils/responser';
import { UserService } from 'src/user/user.service';
import { IUserSchema } from 'src/user/interface/user.interface';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @GrpcMethod('AuthService', 'MakeOtp')
  public async makeOtp(
    body: IMakeOtpRequest,
  ): Promise<IResponse<MakeOtpResult>> {
    const code: number = OtpGenerate.make();
    await this.authService.saveOtp(body.phoneNumber, code);
    //TODO: send sms notify
    return new Responser(true, 'ارسال شد', { code });
  }

  @GrpcMethod('AuthService', 'LoginOtp')
  public async loginOtp(body: ILoginOtp): Promise<IResponse<ILoginOtpResult>> {
    let newUser: IUserSchema;
    const code = await this.authService.getOtp(body.phoneNumber);
    if (code === body.code) {
      this.authService.removeOtp(body.phoneNumber);
      const userExist: IUserSchema = await this.userService.findbymobile(
        body.phoneNumber,
      );
      if (!userExist)
        newUser = await this.userService.create({
          mobile: body.phoneNumber,
        });
      const { accessToken } = this.authService.generateJwt(
        userExist || newUser,
      );
      return new Responser<ILoginOtpResult>(true, '', { accessToken });
    } else throw new ForbiddenException('code is not valid');
  }
}
