import * as mongoose from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate-v2';
import { IUser } from '../interface/user.interface';
export const UserSchema = new mongoose.Schema<IUser>(
  {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
    },
    mobile: {
      type: String,
      required: true,
      unique: true,
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
