import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SmsOtpPattenDTO } from './dto/otp.pattern.dto';
import { Kavenegar, KavenegarError, LookupDto } from 'ts-kavenegar';
@Injectable()
export class SmsService {
  readonly api: Kavenegar;
  constructor(private readonly confService: ConfigService) {
    this.api = new Kavenegar(confService.get('kavenegarApi'));
  }

  public async sendOneByPattern(
    data: SmsOtpPattenDTO,
  ): Promise<boolean | Error> {
    const regex = /\d+/g;
    const receptor = '00' + data.phoneNumber.match(regex); // creates array from matches
    const sendData: LookupDto = {
      receptor,
      token: data.code,
      template: 'tonet-verify-code',
    };
    return this.api
      .lookup(sendData)
      .then(() => {
        return true;
      })
      .catch((err) => {
        if (err instanceof KavenegarError)
          throw new Error('notify not work...');
        else throw new Error('notify not work...');
      });
  }
}
