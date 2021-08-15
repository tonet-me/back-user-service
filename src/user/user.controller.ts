import { Controller, NotFoundException } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { Types } from 'mongoose';
import { Responser } from 'src/common/utils/responser';
import { IResponse } from 'src/common/utils/transform.response';
import {
  IProfileUpdateRequest,
  IProfileUpdateResult,
} from './interface/user.interface';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @GrpcMethod('UserService', 'UpdateProfile')
  public async updateProfile(
    body: IProfileUpdateRequest,
  ): Promise<IResponse<IProfileUpdateResult>> {
    // throw new NotFoundException('peda nashod');
    console.log('ok');

    // const code: number = OtpGenerate.make();
    const user: IProfileUpdateResult = await this.userService.update(
      body.userId,
      body,
    );
    //TODO: send sms notify
    return new Responser(true, 'ارسال شد', user);
  }
}
