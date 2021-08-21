import * as mongoose from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate-v2';
import { IUser } from '../interface/user.interface';
export enum UserStatusEnum {
  REGISTERED = 'REGISTERED',
  COMPLETED = 'COMPLETED',
}
export const UserSchema = new mongoose.Schema<IUser>(
  {
    fullName: {
      type: String,
    },
    title: String,
    email: {
      type: String,
    },
    emailVisible: {
      type: Boolean,
      default: false,
    },
    mobile: {
      type: String,
      required: true,
      unique: true,
    },
    mobileVisible: {
      type: Boolean,
      default: false,
    },
    userName: {
      type: String,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    status: {
      type: String,
      enum: UserStatusEnum,
      default: UserStatusEnum.REGISTERED,
    },
    emailVerify: {
      type: Boolean,
      default: false,
    },
    contact: {
      phone: String,
      fax: String,
      address: String,
    },
    profilePicture: String,
  },
  { timestamps: true },
);

UserSchema.plugin(mongoosePaginate);
