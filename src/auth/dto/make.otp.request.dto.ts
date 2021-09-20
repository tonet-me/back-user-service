import { IsDefined, Matches } from 'class-validator';
export class MakeOtpRequestDTO {
  @Matches(/^\+989[0-9]\d{8}$/)
  @IsDefined()
  readonly phoneNumber: string;
}
