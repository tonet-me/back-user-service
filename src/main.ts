import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import * as path from 'path';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/filter/allExceptions.filter';
import { TransformInterceptor } from './common/utils/transform.response';

async function bootstrap() {
  const HOST = process.env.BASE_URL;
  const PORT = process.env.PORT;
  const URL = `${HOST}:${PORT}`;
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        url: URL,
        package: ['user.auth.otp', 'user.profile'],
        // protoLoader
        protoPath: [
          path.join(__dirname, '../proto/auth.proto'),
          path.join(__dirname, '../proto/user.proto'),
        ],
      },
    },
  );
  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  await app
    .listen()
    .then(() => {
      Logger.log(
        `in 🚀 ${HOST}:${PORT} 🚀`,
        'RUN USER_SERVICE SERVER SUCCESSFUL',
      );
    })
    .catch((err) => {
      Logger.error(err, 'RUN USER_SERVICE SERVER FAILD');
    });
}
bootstrap();
