import { IsDefined, IsEmail, IsString } from 'class-validator';
export class CheckProfileDTO {
  @IsEmail()
  @IsDefined()
  readonly email: string;
}
