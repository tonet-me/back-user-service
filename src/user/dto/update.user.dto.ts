import {
  IsBoolean,
  IsDefined,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';
import { UserStatusEnum } from '../schema/user.schema';
export class UpdateUserDTO {
  @IsOptional()
  @IsString()
  readonly firstName: string;

  @IsOptional()
  @IsString()
  readonly lastName: string;

  @IsEmail()
  @IsOptional()
  readonly email: string;

  @IsString()
  @IsOptional()
  readonly mobile: string;

  @IsString()
  @IsOptional()
  readonly userName: string;

  @IsEnum(UserStatusEnum)
  @IsOptional()
  readonly status: UserStatusEnum;

  @IsEmail()
  @IsOptional()
  readonly emailVerify: string;

  @IsBoolean()
  @IsOptional()
  readonly isActive: boolean;

  @IsUrl()
  @IsOptional()
  readonly profilePicture: string;
}
