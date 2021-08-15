import { Document, Types } from 'mongoose';
import { Observable } from 'rxjs';
import { IResponse } from 'src/common/utils/transform.response';

export enum UserStatus {
  REGISTERED = 'REGISTERED',
  COMPLETED = 'COMPELETED',
}
export interface IUserSchema extends Document {
  readonly firstName: string;
  readonly lastName: string;
  readonly email: string;
  readonly mobile: string;
  readonly userName: string;
  readonly isActive: boolean;
  readonly status: UserStatus;
  readonly emailVerify: boolean;
  readonly profilePicture: string;
}

export interface IUser {
  readonly _id?: Types.ObjectId;
  readonly firstName?: string;
  readonly lastName?: string;
  readonly email?: string;
  readonly mobile?: string;
  readonly userName?: string;
  readonly isActive?: boolean;
  readonly status?: UserStatus;
  readonly emailVerify?: boolean;
  readonly profilePicture?: string;
}

// export interface IUserService {
//   updateProfile(
//     userId: any,
//     data: IProfileUpdateRequest,
//   ): Observable<IResponse<IProfileUpdateResult>>;
// }

/**
 * user profile update interface
 */
export interface IProfileUpdateRequest {
  readonly userId: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly email: string;
  readonly profilePicture: string;
}

export interface IProfileUpdateResult {
  readonly firstName: string;
  readonly lastName: string;
  readonly email: string;
  readonly profilePicture: string;
}
