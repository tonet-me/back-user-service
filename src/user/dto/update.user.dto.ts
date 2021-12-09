import {
  IsBoolean,
  IsDefined,
  IsEmail,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  MinLength,
} from 'class-validator';
import { OmitType } from '@nestjs/mapped-types';

import { UserStatusEnum } from '../schema/user.schema';
import { Match } from 'src/common/decorator/match.decorator';

export class UpdateUserDTO {
  @IsOptional()
  @IsMongoId()
  readonly _id: string;

  @IsOptional()
  @IsString()
  readonly fullName: string;

  @IsString()
  @IsOptional()
  readonly mobile: string;

  @IsEmail()
  @IsOptional()
  readonly email: string;

  @IsEmail()
  @IsOptional()
  readonly emailVerify: string;

  @IsBoolean()
  @IsOptional()
  readonly verified: boolean;

  @IsUrl()
  @IsOptional()
  readonly photo: string;

  @IsBoolean()
  @IsOptional()
  readonly isActive: boolean;

  @IsEnum(UserStatusEnum)
  @IsOptional()
  readonly status: UserStatusEnum;
}
export class UserUpdateLimitDTO extends OmitType(UpdateUserDTO, [
  'status',
  'emailVerify',
  'mobile',
  'isActive',
  'verified',
] as const) {}

export class UserCompleteProfile {
  @IsDefined()
  @IsMongoId()
  readonly _id: string;

  @IsDefined()
  @IsString()
  readonly fullName: string;

  @IsOptional()
  @IsUrl()
  readonly photo: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  readonly password: string;

  @IsNotEmpty()
  @IsString()
  @Match('password')
  @MinLength(8)
  readonly rePassword: string;
}
