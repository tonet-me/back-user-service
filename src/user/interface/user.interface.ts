import { Document, Types } from 'mongoose';
import { UserStatusEnum } from '../schema/user.schema';

export interface IUserSchema extends Document {
  readonly firstName: string;
  readonly lastName: string;
  readonly email: string;
  readonly mobile: string;
  readonly userName: string;
  readonly isActive: boolean;
  readonly status: UserStatusEnum;
  readonly emailVerify: boolean;
  readonly mobileVisible: boolean;
  readonly emailVisible: boolean;
  readonly profilePicture: string;
}

export interface IUser {
  readonly _id?: string;
  readonly firstName?: string;
  readonly lastName?: string;
  readonly email?: string;
  readonly mobile?: string;
  readonly userName?: string;
  readonly isActive?: boolean;
  readonly status?: UserStatusEnum;
  readonly emailVerify?: boolean;
  readonly mobileVisible?: boolean;
  readonly emailVisible?: boolean;
  readonly profilePicture?: string;
}

/**
 * user profile update interface
 */
// export interface IProfileUpdateRequest {
//   readonly userId: string;
//   readonly mobile: string;
//   readonly firstName: string;
//   readonly lastName: string;
//   readonly email: string;
//   readonly profilePicture: string;
//   readonly isActive: boolean;
//   readonly status: UserStatusEnum;
//   readonly userName: boolean;
// }

// export interface IProfileUpdateResult {
//   readonly userId: string;
//   readonly mobile: string;
//   readonly firstName: string;
//   readonly lastName: string;
//   readonly email: string;
//   readonly profilePicture: string;
//   readonly isActive: boolean;
//   readonly status: UserStatusEnum;
//   readonly userName: boolean;
// }
