import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SmsOtpPattenDTO } from './dto/otp.pattern.dto';
import { Kavenegar } from 'ts-kavenegar';
@Injectable()
export class SmsService {
  readonly api: Kavenegar;
  constructor(private readonly confService: ConfigService) {
    this.api = new Kavenegar(confService.get('kavenegarApi'));
  }

  public async sendOneByPattern(
    data: SmsOtpPattenDTO,
  ): Promise<boolean | Error> {
    var regex = /\d+/g;
    const receptor = '00' + data.phoneNumber.match(regex); // creates array from matches
    const result = await this.api.lookup({
      receptor,
      token: data.code,
      template: 'tonet-verify-code',
    });

    if (result.return.status == 200) return true;
    else throw new Error(`message not send with code ${result.return.status}`);
  }
}
