import { Document } from 'mongoose';
import { UserStatusEnum } from '../schema/user.schema';

export interface IUser extends Document {
  readonly fullName: string;
  readonly mobile: string;
  readonly email: string;
  readonly emailVerify: boolean;
  readonly verified: boolean;
  readonly photo: string;
  readonly isActive: boolean;
  readonly status: UserStatusEnum;
  password: string;
}
