import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import dbConf from 'config/db.conf';
import serverConf from 'config/server.conf';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserSchema } from './schema/user.schema';

@Module({
  imports: [
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
    MongooseModule.forFeatureAsync([
      {
        name: 'User',
        useFactory: () => {
          const schema = UserSchema;
          return schema;
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
