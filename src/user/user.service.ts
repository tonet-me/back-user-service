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
}
