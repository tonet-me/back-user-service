import { Controller, NotFoundException } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { Responser } from 'src/common/utils/responser';
import { IResponse } from 'src/common/utils/transform.response';
import { IUser } from './interface/user.interface';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @GrpcMethod('UserService', 'UpdateProfile')
  public async updateProfile(body: IUser): Promise<IResponse<IUser>> {
    const user: IUser = await this.userService.update(body._id, body);
    return new Responser(true, 'Done ', user);
  }
}
