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

  @IsDefined()
  @IsString()
  readonly firstName: string;

  @IsDefined()
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
