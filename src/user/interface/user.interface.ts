import { Document } from 'mongoose';

export enum UserStatus {
  REGISTERED = 'REGISTERED',
  COMPLETED = 'COMPELETED',
}
export interface IUser extends Document {
  readonly firstName: string;
  readonly lastName: string;
  readonly email: string;
  readonly mobile: string;
  readonly userName: string;
  readonly isActive: boolean;
  readonly status: UserStatus;
  readonly emailVerify: boolean;
}
