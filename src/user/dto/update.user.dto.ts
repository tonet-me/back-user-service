import {
  IsBoolean,
  IsDefined,
  IsEmail,
  IsEnum,
  IsMongoId,
  IsOptional,
  IsString,
  IsUrl,
  Matches,
  ValidateNested,
} from 'class-validator';
import { OmitType } from '@nestjs/mapped-types';

import { UserStatusEnum } from '../schema/user.schema';
import { Type } from 'class-transformer';

export class ContactDTO {
  @IsOptional()
  @IsString()
  readonly phone: string;

  @IsOptional()
  @IsString()
  readonly fax: string;

  @IsOptional()
  @IsString()
  readonly address: string;
}
export class UpdateUserDTO {
  @IsOptional()
  @IsMongoId()
  readonly _id: string;

  @IsOptional()
  @IsString()
  readonly fullName: string;

  @IsOptional()
  @IsString()
  readonly title: string;

  @IsEmail()
  @IsOptional()
  readonly email: string;

  @IsString()
  @IsOptional()
  readonly mobile: string;

  @IsString()
  @IsOptional()
  @Matches(/^(?=[a-zA-Z0-9._]{5,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/)
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

  @IsOptional()
  @ValidateNested({
    each: true,
  })
  @Type(() => ContactDTO)
  readonly contact: ContactDTO;
}
export class UserUpdateLimitDTO extends OmitType(UpdateUserDTO, [
  'status',
  'emailVerify',
  'mobile',
  'isActive',
] as const) {}

export class UserCompleteProfile {
  @IsDefined()
  @IsMongoId()
  readonly _id: string;

  @IsDefined()
  @IsString()
  readonly fullName: string;

  @IsOptional()
  @IsString()
  readonly title: string;

  @IsOptional()
  @IsUrl()
  readonly profilePicture: string;

  @IsDefined()
  @IsString()
  @Matches(/^(?=[a-zA-Z0-9._]{5,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/)
  readonly userName: string;
}
