import {
  IsDefined,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  MinLength,
} from 'class-validator';

export class UserCompleteProfileWithOauthDTO {
  @IsDefined()
  @IsMongoId()
  readonly _id: string;

  @IsDefined()
  @IsString()
  readonly fullName: string;

  @IsOptional()
  @IsUrl()
  readonly photo: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  password: string;
}
