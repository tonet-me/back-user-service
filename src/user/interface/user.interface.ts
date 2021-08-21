import { Document, Types } from 'mongoose';
import { UserStatusEnum } from '../schema/user.schema';

interface IContact {
  readonly phone: string;
  readonly fax: string;
  readonly address: string;
}
export interface IUserSchema extends Document {
  readonly fullName: string;
  readonly title: string;
  readonly email: string;
  readonly mobile: string;
  readonly userName: string;
  readonly isActive: boolean;
  readonly status: UserStatusEnum;
  readonly emailVerify: boolean;
  readonly mobileVisible: boolean;
  readonly emailVisible: boolean;
  readonly profilePicture: string;
  readonly contact: IContact;
}

export interface IUser {
  readonly _id?: string;
  readonly fullName?: string;
  readonly title?: string;
  readonly email?: string;
  readonly mobile?: string;
  readonly userName?: string;
  readonly isActive?: boolean;
  readonly status?: UserStatusEnum;
  readonly emailVerify?: boolean;
  readonly mobileVisible?: boolean;
  readonly emailVisible?: boolean;
  readonly profilePicture?: string;
  readonly contact?: IContact;
}
