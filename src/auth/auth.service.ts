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
import { OtpGenerate } from 'src/common/helper/otp.generate';

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

  public async saveOtp(phoneNumber: string, code: number) {
    await this.cacheManager.set(phoneNumber + 'OTP', code, {
      ttl: this.configService.get('OTP_TTL'),
    });
  }

  public async getOtp(phoneNumber: string) {
    return this.cacheManager.get(phoneNumber + 'OTP');
  }
  public async removeOtp(phoneNumber: string) {
    return this.cacheManager.del(phoneNumber + 'OTP');
  }

  public async generateJwt(user: Partial<IUser>): Promise<any> {
    const payload = { mobile: user.mobile, sub: user._id, status: user.status };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  public async generateRefreshJwt(user: Partial<IUser>): Promise<any> {
    console.log(this.refreshTokenExpirationTime);

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

  public async canRequestOtp(phoneNumber: string): Promise<boolean> {
    const hasCode = await this.getOtp(phoneNumber);

    if (hasCode) return false;
    return true;
  }

  public async generateOrpCode(phoneNumber): Promise<number> {
    const code: number = OtpGenerate.make();
    await this.saveOtp(phoneNumber, code);
    return code;
  }
}
