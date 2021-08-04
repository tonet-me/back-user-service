import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel, Types } from 'mongoose';
import { CreateUserDTO } from './dto/create.user.dto';
import { UpdateUserDTO } from './dto/update.user.dto';
import { IUser } from './interface/user.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User')
    private userModel: PaginateModel<IUser>,
  ) {}

  public async findbyId(userId: Types.ObjectId): Promise<IUser> {
    return this.userModel.findById(userId);
  }
  public async create(userData: CreateUserDTO): Promise<IUser> {
    const newUser = new this.userModel(userData);
    return newUser.save();
  }

  public async update(
    userId: Types.ObjectId,
    UserData: UpdateUserDTO,
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
