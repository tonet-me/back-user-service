import { Type } from 'class-transformer';
import {
  IsDefined,
  IsEmail,
  IsOptional,
  IsString,
  IsUrl,
  ValidateNested,
} from 'class-validator';
import { ContactDTO } from './update.user.dto';
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

  @IsOptional()
  @ValidateNested({
    each: true,
  })
  @Type(() => ContactDTO)
  readonly contact: ContactDTO;
}
