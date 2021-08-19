import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel, Types } from 'mongoose';
import { CreateUserDTO } from './dto/create.user.dto';
import { UpdateUserDTO } from './dto/update.user.dto';
import { IUser, IUserSchema } from './interface/user.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User')
    private userModel: PaginateModel<IUserSchema>,
  ) {}

  public async findbyId(userId: string): Promise<IUser> {
    return this.userModel.findById(userId);
  }

  public async findbymobile(mobile: string): Promise<IUser> {
    return this.userModel.findOne({ mobile });
  }

  public async findByUsername(userName: string): Promise<IUser> {
    return this.userModel.findOne({ userName });
  }
  public async create(userData: IUser): Promise<IUserSchema> {
    const newUser = new this.userModel(userData);
    return newUser.save();
  }

  public async update(userId: string, UserData: IUser): Promise<IUser> {
    return this.userModel.findByIdAndUpdate(
      userId,
      {
        $set: UserData,
      },
      {
        new: true,
      },
    );
  }
  public async setVisible(
    userId: string,
    visibleData: { mobileVisible?: boolean; emailVisible?: boolean },
  ): Promise<IUser> {
    return this.userModel.findByIdAndUpdate(
      userId,
      {
        $set: visibleData,
      },
      {
        new: true,
      },
    );
  }
}
