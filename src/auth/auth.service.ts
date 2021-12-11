import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { Hash } from 'src/common/bcrypt/hash.bcrypt';
import { ICheckEmailAndPassword } from './interface/auth.interface';
import { User, UserDocument } from 'src/user/schema/user.schema';

@Injectable()
export class AuthService {
  readonly refreshTokenSecret;
  readonly refreshTokenExpirationTime;
  constructor(
    private readonly userService: UserService,
    private configService: ConfigService,
    private jwtService: JwtService,
  ) {
    this.refreshTokenSecret = this.configService.get('refreshTokenSecret');
    this.refreshTokenExpirationTime = this.configService.get(
      'refreshTokenExpireTime',
    );
  }

  public async generateJwt(user: Partial<UserDocument>): Promise<any> {
    const payload = {
      email: user.email,
      sub: user._id,
      status: user.status,
      oauthRegistered: user.oauthRegistered,
      oauthProvider: user.oauthProvider,
    };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  public async generateRefreshJwt(user: Partial<UserDocument>): Promise<any> {
    const payload = { sub: user._id };
    return {
      refreshToken: this.jwtService.sign(payload, {
        secret: this.refreshTokenSecret,
        expiresIn: this.refreshTokenExpirationTime,
      }),
    };
  }

  public async validateJwt(token: any): Promise<User> {
    const { sub } = this.jwtService.verify(token);

    const user: User = await this.userService.findbyId(sub);

    if (user) return user;

    throw new UnauthorizedException();
  }

  public async validateRefreshJwt(token: any): Promise<User> {
    const { sub } = this.jwtService.verify(token, {
      secret: this.refreshTokenSecret,
    });

    const user: User = await this.userService.findbyId(sub);

    if (user) return user;

    throw new UnauthorizedException();
  }

  public async checkEmailAndPassword(
    email: string,
    password: string,
  ): Promise<ICheckEmailAndPassword> {
    const user: UserDocument =
      await this.userService.findByEmailWithSelectPassword(email);
    if (user) {
      const compare = await Hash.compare(password, user.password);
      if (!compare)
        throw new UnauthorizedException('email or password is incorrect');
      return {
        success: true,
        user,
      };
    }
    return {
      success: false,
      user: undefined,
    };
  }
}
