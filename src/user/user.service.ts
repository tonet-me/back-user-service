import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel } from 'mongoose';
import { IUser } from './interface/user.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User')
    private userModel: PaginateModel<IUser>,
  ) {}

  public async findbyId(userId: string): Promise<IUser> {
    return this.userModel.findById(userId);
  }

  public async findbyEmail(email: string): Promise<IUser> {
    return this.userModel.findOne({ email });
  }

  public async create(userData: Partial<IUser>): Promise<IUser> {
    const newUser = new this.userModel(userData);
    return newUser.save();
  }

  public async update(
    userId: string,
    UserData: Partial<IUser>,
  ): Promise<IUser> {
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
}
