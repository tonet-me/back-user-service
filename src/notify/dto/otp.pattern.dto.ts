import {
  IsDefined,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';

export class SmsOtpPattenDTO {
  @IsDefined()
  @Matches(/^\+989[0-9]\d{8}$/)
  readonly phoneNumber: string;

  @IsDefined()
  @IsNumber()
  readonly code: string;

  @IsOptional()
  @IsString()
  readonly template?: string = 'tonet-verify-code';
}
