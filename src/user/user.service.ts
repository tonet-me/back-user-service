import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel } from 'mongoose';
import { User, UserDocument } from './schema/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: PaginateModel<UserDocument>,
  ) {}

  public async findbyId(userId: string): Promise<User> {
    return this.userModel.findById(userId);
  }

  public async findbyEmail(email: string): Promise<User> {
    return this.userModel.findOne({ email });
  }
  public async findByEmailWithSelectPassword(email: string): Promise<User> {
    return this.userModel.findOne({ email }).select('+password').exec();
  }

  public async findByIdWithSelectPassword(userId: string): Promise<User> {
    return this.userModel.findById(userId).select('+password').exec();
  }

  public async create(userData: Partial<User>): Promise<User> {
    const newUser = new this.userModel(userData);
    return newUser.save();
  }

  public async update(userId: string, UserData: Partial<User>): Promise<User> {
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
