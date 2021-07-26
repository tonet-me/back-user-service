import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { Observable, of } from 'rxjs';
import { AppService } from './app.service';
import { IMakeOtpResponse } from './interface/user.grpc.interface';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @GrpcMethod('AuthService', 'MakeOtp')
  makeOtp(body): Observable<IMakeOtpResponse> {
    console.log('ok');

    // const newUser = await this.appService.create(body);
    return of({ code: 'ok' });
  }
}
