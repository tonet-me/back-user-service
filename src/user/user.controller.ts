import { Controller, NotFoundException } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { Responser } from 'src/common/utils/responser';
import { IResponse } from 'src/common/utils/transform.response';
import { UserCompleteProfile, UserUpdateLimitDTO } from './dto/update.user.dto';
import { IUser } from './interface/user.interface';
import { UserStatusEnum } from './schema/user.schema';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @GrpcMethod('UserService', 'UpdateProfile')
  public async updateProfile(
    body: UserUpdateLimitDTO,
  ): Promise<IResponse<IUser>> {
    const { _id, ...updateData } = body;
    const user: IUser = await this.userService.update(_id, updateData);
    return new Responser(true, 'Done ', user);
  }

  @GrpcMethod('UserService', 'CompleteProfile')
  public async completeProfile(
    body: UserCompleteProfile,
  ): Promise<IResponse<IUser>> {
    const { _id, ...CompleteData } = body;
    const user: IUser = await this.userService.update(_id, {
      status: UserStatusEnum.COMPLETED,
      ...CompleteData,
    });
    return new Responser(true, 'Done ', user);
  }
}
