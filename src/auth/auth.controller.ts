import {
  Controller,
  ForbiddenException,
  UnauthorizedException,
} from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { IResponse } from 'src/common/utils/transform.response';
import { AuthService } from './auth.service';
import {
  ICheckEmailBeforRegisterRequest,
  ICheckEmailBeforRegisterResponse,
  IGetRefreshToken,
  ILoginResult,
  ILoginWithEmailRequest,
  IOauthGenerateToken,
  IRegisterWithEmailRequest,
} from './interface/auth.interface';
import { Responser } from 'src/common/utils/responser';
import { UserService } from 'src/user/user.service';
import { emailCodeGenerator } from 'src/common/utils/code-generator';
import { NodeCache } from 'src/common/node-cache/node-cache';
import { Hash } from 'src/common/bcrypt/hash.bcrypt';
import { MailService } from 'src/mail/mail.service';
import { User } from 'src/user/schema/user.schema';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private mailService: MailService,
  ) {}

  @GrpcMethod('AuthService', 'LoginWithOauth')
  public async loginWithOauth(
    body: IOauthGenerateToken,
  ): Promise<IResponse<ILoginResult>> {
    let newUser: User;
    const userExist: User = await this.userService.findbyEmail(body.email);
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

  @GrpcMethod('AuthService', 'CheckEmailBeforRegister')
  public async checkEmailBeforRegister(
    body: ICheckEmailBeforRegisterRequest,
  ): Promise<IResponse<ICheckEmailBeforRegisterResponse>> {
    const mailExist = await this.userService.findbyEmail(body.email);
    if (mailExist)
      return new Responser(true, 'email exist', {
        email: body.email,
        registered: true,
      });
    const code: number = emailCodeGenerator();
    NodeCache.addRegisterWithEmail(body.email, code);
    await this.mailService.sendRegisterCode({ email: body.email, code });

    return new Responser<ICheckEmailBeforRegisterResponse>(true, '', {
      email: body.email,
      registered: false,
    });
  }

  @GrpcMethod('AuthService', 'RegisterWithEmail')
  public async registerWithEmail(
    body: IRegisterWithEmailRequest,
  ): Promise<IResponse<ILoginResult>> {
    const { code, password, email } = body;
    const getCodeFromCache = await NodeCache.getValueRegisterWithEmail(email);
    if (code == getCodeFromCache) {
      NodeCache.deleteRegisterWithEmail(email);
      const newUser: User = await this.userService.create({
        email: email,
        emailVerify: true,
        password: await Hash.add(password),
      });
      const { accessToken } = await this.authService.generateJwt(newUser);
      const { refreshToken } = await this.authService.generateRefreshJwt(
        newUser,
      );
      return new Responser<ILoginResult>(true, 'Done', {
        accessToken,
        refreshToken,
        status: newUser.status,
      });
    } else throw new ForbiddenException('the code is incorrect');
  }

  @GrpcMethod('AuthService', 'LoginWithEmail')
  public async loginWithEmail(
    body: ILoginWithEmailRequest,
  ): Promise<IResponse<ILoginResult>> {
    const validEmailAndPass = await this.authService.checkEmailAndPassword(
      body.email,
      body.password,
    );
    if (!validEmailAndPass.success)
      throw new ForbiddenException('email or password is incorrect');
    const { accessToken } = await this.authService.generateJwt(
      validEmailAndPass.user,
    );
    const { refreshToken } = await this.authService.generateRefreshJwt(
      validEmailAndPass.user,
    );
    return new Responser<ILoginResult>(true, 'Done', {
      accessToken,
      refreshToken,
      status: validEmailAndPass.user.status,
    });
  }

  @GrpcMethod('AuthService', 'validateAccessToken')
  public async validateAccessToken(
    body: ILoginResult,
  ): Promise<IResponse<User>> {
    const user: User = await this.authService.validateJwt(body.accessToken);
    if (user) return new Responser<User>(true, '', user);
    throw new UnauthorizedException();
  }

  @GrpcMethod('AuthService', 'getRefreshToken')
  public async getRefreshToken(
    body: IGetRefreshToken,
  ): Promise<IResponse<ILoginResult>> {
    const user: User = await this.authService.validateRefreshJwt(
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
