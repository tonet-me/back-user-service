import * as mongoose from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate-v2';
import { IUser } from '../interface/user.interface';

export enum UserStatusEnum {
  REGISTERED = 'registered',
  COMPLETED = 'completed',
}

export const UserSchema = new mongoose.Schema<IUser>(
  {
    fullName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      select: false,
    },
    emailVerify: {
      type: Boolean,
      default: false,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    photo: String,
    isActive: {
      type: Boolean,
      default: true,
    },
    status: {
      type: String,
      enum: UserStatusEnum,
      default: UserStatusEnum.REGISTERED,
    },
    oauthRegistered: {
      type: Boolean,
      default: false,
    },
    oauthProvider: String,
  },
  { timestamps: true },
);

UserSchema.plugin(mongoosePaginate);
