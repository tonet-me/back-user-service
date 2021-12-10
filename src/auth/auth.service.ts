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
    this.refreshTokenSecret = this.configService.get('refreshTokenSecret');
    this.refreshTokenExpirationTime = this.configService.get(
      'refreshTokenExpireTime',
    );

    let authMechanism = configService.get<string>('database.authMechanism');
    let authSource = configService.get<string>('database.authSource');

    let auth =
      configService.get<string>('env') != 'production'
        ? undefined
        : {
            user: configService.get<string>('database.dbUser'),
            password: configService.get<string>('database.dbPass'),
          };
    console.log(auth);
    console.log(authMechanism);

    console.log(authSource);
  }

  public async generateJwt(user: Partial<IUser>): Promise<any> {
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
