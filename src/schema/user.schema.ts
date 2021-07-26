import * as mongoose from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate-v2';
import { IUser } from '../interface/user.grpc.interface';
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
      unique: true,
    },
    mobile: {
      type: String,
      required: true,
      unique: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

UserSchema.plugin(mongoosePaginate);
