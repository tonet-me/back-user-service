import { Document } from 'mongoose';

export interface IUser extends Document {
  readonly firstName: string;
  readonly lastName: string;
  readonly email: string;
  readonly mobile: string;
  readonly isActive: boolean;
}
