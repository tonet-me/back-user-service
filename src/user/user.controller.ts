import {
  Controller,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { Hash } from 'src/common/bcrypt/hash.bcrypt';
import { NodeCache } from 'src/common/node-cache/node-cache';
import { emailForgetCodeGenerator } from 'src/common/utils/code-generator';
import { Responser } from 'src/common/utils/responser';
import { IResponse } from 'src/common/utils/transform.response';
import { ChangePasswordDTO } from './dto/change.password.dto';
import { UserCompleteProfileWithEmailDTO } from './dto/complete.profile.email.dto';
import { UserCompleteProfileWithOauthDTO } from './dto/complete.profile.oauth.dto';
import { ForgetPasswordRequestCodeDTO } from './dto/forget.password.request.code.sto';
import { UserIdDTO } from './dto/get.userId.dto';
import { UserUpdateLimitDTO } from './dto/update.user.dto';
import { IRequestCodeForForgetPassword } from './interface/user.interface';
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

  @GrpcMethod('UserService', 'ChangePassword')
  public async changePassword(
    body: ChangePasswordDTO,
  ): Promise<IResponse<User>> {
    const { _id, ...passwordsData } = body;
    const userExist = await this.userService.findByIdWithSelectPassword(_id);
    if (!userExist) throw new NotFoundException('user not found');
    const validOldPassword = await Hash.compare(
      passwordsData.oldPassword,
      userExist.password,
    );
    if (!validOldPassword)
      throw new ForbiddenException('old password is wrong');

    const user: User = await this.userService.update(_id, {
      password: await Hash.add(passwordsData.newPassword),
    });
    return new Responser(true, 'Done ', user);
  }

  @GrpcMethod('UserService', 'RequestCodeForForgetPassword')
  public async requestCodeForForgetPassword(
    body: ForgetPasswordRequestCodeDTO,
  ): Promise<IResponse<IRequestCodeForForgetPassword>> {
    const { email } = body;
    const userExist = await this.userService.findbyEmail(email);
    if (!userExist) throw new NotFoundException('user not found');
    const forgetCode: number = emailForgetCodeGenerator();
    await NodeCache.addForgetPasswordCode(email, forgetCode);
    //TODO: send email
    return new Responser(true, 'Done ', {
      email,
      canUse: true,
    });
  }

  @GrpcMethod('UserService', 'DeleteProfilePhoto')
  public async deleteProfilePhoto(body: UserIdDTO): Promise<IResponse<User>> {
    const { _id } = body;
    const deletePhoto = await this.userService.update(_id, {
      photo: '',
    });
    if (!deletePhoto) throw new NotFoundException('user not found');
    return new Responser(true, '', deletePhoto);
  }
}
