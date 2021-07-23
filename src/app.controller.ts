import { Controller, Get } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { AppService } from './app.service';
import { IUser } from './interface/user.grpc.interface';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @GrpcMethod('UserService', 'Register')
  async register(body): Promise<{ message: string; jwt: string }> {
    const newUser = await this.appService.create(body);
    return { message: 'ok', jwt: 'sadas' };
  }
}
