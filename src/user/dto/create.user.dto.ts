import {
  IsDefined,
  IsEmail,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';
export class CreateUserDTO {
  @IsString()
  @IsDefined()
  readonly mobile: string;

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
  readonly userName: string;

  @IsUrl()
  @IsOptional()
  readonly profilePicture: string;
}
