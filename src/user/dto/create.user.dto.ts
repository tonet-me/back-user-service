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
  readonly firstName: string;

  @IsOptional()
  @IsString()
  readonly lastName: string;

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
