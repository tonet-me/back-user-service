import * as mongoose from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate-v2';
import { IUser } from '../interface/user.interface';
import { Hash } from 'src/common/bcrypt/hash.bcrypt';

export enum UserStatusEnum {
  REGISTERED = 'registered',
  COMPLETED = 'completed',
}

export const UserSchema = new mongoose.Schema<IUser>(
  {
    fullName: {
      type: String,
    },
    mobile: {
      type: String,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
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
  },
  { timestamps: true },
);

UserSchema.plugin(mongoosePaginate);

UserSchema.pre('save', async function (next) {
  var user = this;
  if (!user.isModified('password')) return next();
  user.password = await Hash.add(user.password);

  next();
});
