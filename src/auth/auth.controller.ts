import { Controller, UnauthorizedException } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { IResponse } from 'src/common/utils/transform.response';
import { AuthService } from './auth.service';
import {
  IGetRefreshToken,
  ILoginResult,
  IOauthGenerateToken,
} from './interface/auth.interface';
import { Responser } from 'src/common/utils/responser';
import { UserService } from 'src/user/user.service';
import { IUser } from 'src/user/interface/user.interface';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @GrpcMethod('AuthService', 'LoginWithOauth')
  public async loginWithOauth(
    body: IOauthGenerateToken,
  ): Promise<IResponse<ILoginResult>> {
    let newUser: IUser;
    const userExist: IUser = await this.userService.findbyEmail(body.email);
    if (!userExist)
      newUser = await this.userService.create({
        email: body.email,
        emailVerify: true,
        oauthRegistered: true,
        oauthProvider: body.oauthProvider,
      });
    const { accessToken } = await this.authService.generateJwt(
      userExist || newUser,
    );
    const { refreshToken } = await this.authService.generateRefreshJwt(
      userExist || newUser,
    );
    return new Responser<ILoginResult>(true, 'Done', {
      accessToken,
      refreshToken,
      status: userExist?.status || newUser?.status,
    });
  }

  @GrpcMethod('AuthService', 'validateAccessToken')
  public async validateAccessToken(
    body: ILoginResult,
  ): Promise<IResponse<IUser>> {
    const user: IUser = await this.authService.validateJwt(body.accessToken);
    if (user) return new Responser<IUser>(true, '', user);
    throw new UnauthorizedException();
  }

  @GrpcMethod('AuthService', 'getRefreshToken')
  public async getRefreshToken(
    body: IGetRefreshToken,
  ): Promise<IResponse<ILoginResult>> {
    const user: IUser = await this.authService.validateRefreshJwt(
      body.refreshToken,
    );
    if (user) {
      const { accessToken } = await this.authService.generateJwt(user);
      const { refreshToken } = await this.authService.generateRefreshJwt(user);
      return new Responser<ILoginResult>(true, 'Done', {
        accessToken,
        refreshToken,
      });
    }
    throw new UnauthorizedException();
  }
}
