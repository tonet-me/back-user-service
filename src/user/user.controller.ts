import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { Observable, of } from 'rxjs';
import { OtpGenerate } from 'src/common/helper/otp.generate';

@Controller('user')
export class UserController {}
