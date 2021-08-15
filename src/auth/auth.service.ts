import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserService } from 'src/user/user.service';
import { Cache } from 'cache-manager';
import { JwtService } from '@nestjs/jwt';
import { IUser, IUserSchema } from 'src/user/interface/user.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private configService: ConfigService,
    private jwtService: JwtService,
  ) {}

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

  public generateJwt(user: IUser): any {
    const payload = { mobile: user.mobile, sub: user._id, status: user.status };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
