import { Controller, Get } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { AppService } from './app.service';
import { IUser } from './interface/user.grpc.interface';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @GrpcMethod('AuthService', 'MakeOtp')
  makeOtp(body): Observable<any> {
    console.log('ok');

    // const newUser = await this.appService.create(body);
    return { code: 'ok', jwt: 'sadas' };
  }
}
