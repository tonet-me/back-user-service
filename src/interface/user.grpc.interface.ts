import { Observable } from 'rxjs';

import { Document } from 'mongoose';

export interface UserService {
  register(data: IRegisterRequest): Observable<any>;
}

export interface IRegisterRequest {
  firstName: string;
  lastNamee: string;
  password: string;
  rePassword: string;
  email: string;
  mobile: string;
  profilePhoto: string;
}

export interface IUser extends Document {
  firstName: string;
  lastNamee: string;
  email: string;
  mobile: string;
  profilePhoto: string;
  password: string;
}

export interface IRegisterResponse {
  message: string;
  data: IUser;
}
