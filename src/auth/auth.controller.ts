import {
  Controller,
  ForbiddenException,
  UnauthorizedException,
} from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { IResponse } from 'src/common/utils/transform.response';
import { AuthService } from './auth.service';
import {
  ILoginOtp,
  ILoginOtpResult,
  IMakeOtpResult,
} from './interface/auth.interface';
import { Responser } from 'src/common/utils/responser';
import { UserService } from 'src/user/user.service';
import { IUser } from 'src/user/interface/user.interface';
import { MakeOtpRequestDTO } from './dto/make.otp.request.dto';
import { LoginOtpDTO } from './dto/login.otp.dto';
import { SmsService } from 'src/notify/sms.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private smsService: SmsService,
  ) {}

  @GrpcMethod('AuthService', 'MakeOtp')
  public async makeOtp(
    body: MakeOtpRequestDTO,
  ): Promise<IResponse<IMakeOtpResult>> {
    const canRequestOtp = await this.authService.canRequestOtp(
      body.phoneNumber,
    );

    if (!canRequestOtp)
      throw new ForbiddenException('The code has already been sent');

    const code: number = await this.authService.generateOrpCode(
      body.phoneNumber,
    );

    const sendNotify = await this.smsService.sendOneByPattern({
      code: code.toString(),
      phoneNumber: body.phoneNumber,
    });

    return new Responser(true, 'The code was sent:');
  }

  @GrpcMethod('AuthService', 'LoginOtp')
  public async loginOtp(
    body: LoginOtpDTO,
  ): Promise<IResponse<ILoginOtpResult>> {
    let newUser: IUser;
    const code = await this.authService.getOtp(body.phoneNumber);
    if (code === body.code) {
      this.authService.removeOtp(body.phoneNumber);
      const userExist: IUser = await this.userService.findbymobile(
        body.phoneNumber,
      );
      if (!userExist)
        newUser = await this.userService.create({
          mobile: body.phoneNumber,
        });
      const { accessToken } = await this.authService.generateJwt(
        userExist || newUser,
      );
      const { refreshToken } = await this.authService.generateRefreshJwt(
        userExist || newUser,
      );
      return new Responser<ILoginOtpResult>(true, 'Done', {
        accessToken,
        refreshToken,
      });
    } else throw new ForbiddenException('code is not valid');
  }

  @GrpcMethod('AuthService', 'validateAccessToken')
  public async validateAccessToken(
    body: ILoginOtpResult,
  ): Promise<IResponse<IUser>> {
    const user: IUser = await this.authService.validateJwt(body.accessToken);
    if (user) return new Responser<IUser>(true, '', user);
    throw new UnauthorizedException();
  }

  @GrpcMethod('AuthService', 'getRefreshToken')
  public async getRefreshToken(
    body: ILoginOtpResult,
  ): Promise<IResponse<ILoginOtpResult>> {
    const user: IUser = await this.authService.validateRefreshJwt(
      body.refreshToken,
    );
    if (user) {
      const { accessToken } = await this.authService.generateJwt(user);
      const { refreshToken } = await this.authService.generateRefreshJwt(user);
      return new Responser<ILoginOtpResult>(true, 'Done', {
        accessToken,
        refreshToken,
      });
    }
    throw new UnauthorizedException();
  }
}
