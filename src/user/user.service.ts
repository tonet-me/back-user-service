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

  public async findbymobile(mobile: string): Promise<IUser> {
    return this.userModel.findOne({ mobile });
  }

  // public async getPublic(userName: string): Promise<IUser[]> {
  //   const users = await this.userModel.aggregate([
  //     {
  //       $match: {
  //         userName,
  //       },
  //     },
  //     {
  //       $project: {
  //         _id: 1,
  //         fullName: 1,
  //         title: 1,
  //         profilePicture: 1,
  //         userName: 1,
  //         contact: 1,
  //         mobile: {
  //           $cond: [{ $eq: ['$mobileVisible', true] }, '$mobile', null],
  //         },
  //         email: {
  //           $cond: [{ $eq: ['$emailVisible', true] }, '$email', null],
  //         },
  //       },
  //     },
  //   ]);
  //   return users.length > 0 ? users[0] : null;
  // }
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
