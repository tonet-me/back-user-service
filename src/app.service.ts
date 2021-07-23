import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel, Types } from 'mongoose';
import { IRegisterRequest, IUser } from './interface/user.grpc.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AppService {
  constructor(
    @InjectModel('User')
    private readonly userModel: PaginateModel<IUser>,
    private readonly configService: ConfigService,
  ) {}
  async create(createBody: IRegisterRequest): Promise<IUser> {
    const newUser = new this.userModel(createBody);
    await newUser.save();
    return newUser;
  }

  async comparePassword(password: string, hash: string): Promise<boolean> {
    const isMatch = await bcrypt.compare(password, hash);
    return isMatch;
  }
  async findUserById(userId: Types.ObjectId): Promise<IUser> {
    return this.userModel.findById(userId).exec();
  }
}
