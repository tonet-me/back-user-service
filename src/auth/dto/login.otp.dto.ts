import { IsDefined, IsNumber, Matches } from 'class-validator';

export class LoginOtpDTO {
  @IsDefined()
  @Matches(/^\+989[0-9]\d{8}$/)
  readonly phoneNumber: string;

  @IsDefined()
  @IsNumber()
  readonly code: number;
}
