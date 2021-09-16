import { Type } from 'class-transformer';
import {
  IsDefined,
  IsEmail,
  IsOptional,
  IsString,
  IsUrl,
  ValidateNested,
} from 'class-validator';
export class CreateUserDTO {
  @IsString()
  @IsDefined()
  readonly mobile: string;

  @IsOptional()
  @IsString()
  readonly fullName: string;

  @IsEmail()
  @IsOptional()
  readonly email: string;

  @IsUrl()
  @IsOptional()
  readonly photo: string;
}
