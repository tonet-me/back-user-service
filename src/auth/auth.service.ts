import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserService } from 'src/user/user.service';
import { Cache } from 'cache-manager';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private configService: ConfigService,
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
}
