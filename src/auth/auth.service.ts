import {
  CACHE_MANAGER,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserService } from 'src/user/user.service';
import { Cache } from 'cache-manager';
import { JwtService } from '@nestjs/jwt';
import { IUser } from 'src/user/interface/user.interface';

@Injectable()
export class AuthService {
  readonly refreshTokenSecret;
  readonly refreshTokenExpirationTime;
  constructor(
    private readonly userService: UserService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private configService: ConfigService,
    private jwtService: JwtService,
  ) {
    this.refreshTokenSecret = configService.get('refreshTokenSecret');
    this.refreshTokenExpirationTime = configService.get(
      'refreshTokenExpireTime',
    );
  }

  public async generateJwt(user: Partial<IUser>): Promise<any> {
    const payload = { email: user.email, sub: user._id, status: user.status };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  public async generateRefreshJwt(user: Partial<IUser>): Promise<any> {
    const payload = { sub: user._id };
    return {
      refreshToken: this.jwtService.sign(payload, {
        secret: this.refreshTokenSecret,
        expiresIn: this.refreshTokenExpirationTime,
      }),
    };
  }

  public async validateJwt(token: any): Promise<IUser> {
    const { sub } = this.jwtService.verify(token);

    const user: IUser = await this.userService.findbyId(sub);

    if (user) return user;

    throw new UnauthorizedException();
  }

  public async validateRefreshJwt(token: any): Promise<IUser> {
    const { sub } = this.jwtService.verify(token, {
      secret: this.refreshTokenSecret,
    });

    const user: IUser = await this.userService.findbyId(sub);

    if (user) return user;

    throw new UnauthorizedException();
  }
}
