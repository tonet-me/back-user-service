import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Aggregate, PaginateModel, PaginateResult, Types } from 'mongoose';
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

  public async getPublic(userName: string): Promise<IUser[]> {
    const users = await this.userModel.aggregate([
      {
        $match: {
          userName,
        },
      },
      {
        $project: {
          _id: 1,
          firstName: 1,
          lastName: 1,
          profilePicture: 1,
          userName: 1,
          mobile: {
            $cond: [{ $eq: ['$mobileVisible', true] }, '$mobile', null],
          },
          email: {
            $cond: [{ $eq: ['$emailVisible', true] }, '$email', null],
          },
        },
      },
    ]);
    return users.length > 0 ? users[0] : null;
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
