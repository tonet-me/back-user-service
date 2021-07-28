import { Module, CacheModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import dbConf from 'config/db.conf';
import serverConf from 'config/server.conf';
import { UserSchema } from './user/schema/user.schema';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    CacheModule.register(),
    ConfigModule.forRoot({
      envFilePath: ['.env.dev', '.env.prod'],
      load: [dbConf, serverConf],
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('database.uri'),
        useNewUrlParser: true,
        replicaSet: false,
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    // UserModule,
  ],
})
export class AppModule {}
