import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { SmsService } from 'src/notify/sms.service';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, SmsService],
  imports: [
    UserModule,
    CacheModule.register(),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('accessTokenSecret'),
        signOptions: { expiresIn: configService.get('accessTokenExpireTime') },
      }),
      inject: [ConfigService],
    }),
  ],
})
export class AuthModule {}
