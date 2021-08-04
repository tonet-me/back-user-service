import * as mongoose from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate-v2';
import { IUser } from '../interface/user.interface';
export const UserSchema = new mongoose.Schema<IUser>(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    mobile: {
      type: String,
      required: true,
      unique: true,
    },
    userName: {
      type: String,
      unique: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    status: {
      type: String,
      enum: ['REGISTERED', 'COMPLETED'],
      default: 'REGISTERED',
    },
    emailVerify: {
      type: Boolean,
      default: false,
    },
    profilePicture: String,
  },
  { timestamps: true },
);

UserSchema.plugin(mongoosePaginate);
