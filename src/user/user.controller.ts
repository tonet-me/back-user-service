import { Controller, NotFoundException } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { Hash } from 'src/common/bcrypt/hash.bcrypt';
import { Responser } from 'src/common/utils/responser';
import { IResponse } from 'src/common/utils/transform.response';
import { UserCompleteProfileWithEmailDTO } from './dto/complete.profile.email.dto';
import { UserCompleteProfileWithOauthDTO } from './dto/complete.profile.oauth.dto';
import { UserIdDTO } from './dto/get.userId.dto';

import { UserUpdateLimitDTO } from './dto/update.user.dto';
import { User, UserStatusEnum } from './schema/user.schema';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @GrpcMethod('UserService', 'GetProfile')
  public async getProfile(body: UserIdDTO): Promise<IResponse<User>> {
    const { _id } = body;
    const user: User = await this.userService.findbyId(_id);
    if (!user) throw new NotFoundException('user not find');
    return new Responser(true, 'Done ', user);
  }

  @GrpcMethod('UserService', 'UpdateProfile')
  public async updateProfile(
    body: UserUpdateLimitDTO,
  ): Promise<IResponse<User>> {
    const { _id, ...updateData } = body;
    const user: User = await this.userService.update(_id, updateData);
    if (!user) throw new NotFoundException('user not find');
    return new Responser(true, 'Done ', user);
  }

  @GrpcMethod('UserService', 'CompleteProfileWithOauth')
  public async completeProfileWithOauth(
    body: UserCompleteProfileWithOauthDTO,
  ): Promise<IResponse<User>> {
    const { _id, ...CompleteData } = body;
    CompleteData.password = await Hash.add(CompleteData.password);
    const user: User = await this.userService.update(_id, {
      status: UserStatusEnum.COMPLETED,
      ...CompleteData,
    });
    return new Responser(true, 'Done ', user);
  }

  @GrpcMethod('UserService', 'CompleteProfileWithEmail')
  public async completeProfileWithEmail(
    body: UserCompleteProfileWithEmailDTO,
  ): Promise<IResponse<User>> {
    const { _id, ...CompleteData } = body;
    const user: User = await this.userService.update(_id, {
      status: UserStatusEnum.COMPLETED,
      ...CompleteData,
    });
    return new Responser(true, 'Done ', user);
  }
}
