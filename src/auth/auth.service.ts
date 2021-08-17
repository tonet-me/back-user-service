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
import { IUser, IUserSchema } from 'src/user/interface/user.interface';
import { OtpGenerate } from 'src/common/helper/otp.generate';

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

  public async valiadteJwt(token: any): Promise<IUser> {
    const { sub } = this.jwtService.verify(token);

    const user: IUser = await this.userService.findbyId(sub);

    if (user) return user;

    throw new UnauthorizedException();
  }

  public async canRequestOtp(phoneNumber: string): Promise<boolean> {
    const hasCode = await this.getOtp(phoneNumber);
    console.log('has code', hasCode);

    if (hasCode) return false;
    return true;
  }

  public async generateOrpCode(phoneNumber): Promise<number> {
    const code: number = OtpGenerate.make();
    await this.saveOtp(phoneNumber, code);
    return code;
  }
}
