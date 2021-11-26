import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SmsOtpPattenDTO } from './dto/otp.pattern.dto';
import * as Kavenegar from 'kavenegar';

@Injectable()
export class SmsService {
  readonly api;
  constructor(private readonly confService: ConfigService) {
    this.api = Kavenegar.KavenegarApi({
      apikey: confService.get('kavenegarApi'),
    });
  }

  public async sendOneByPattern(
    data: SmsOtpPattenDTO,
  ): Promise<boolean | Error> {
    var regex = /\d+/g;
    const receptor = '00' + data.phoneNumber.match(regex); // creates array from matches
    return new Promise((resolve, reject) => {
      this.api.VerifyLookup(
        {
          receptor,
          token: data.code,
          template: 'tonet-verify-code',
        },
        function (response, status) {
          if (status == 200) return resolve(true);
          else return reject(new Error(`message not send with code ${status}`));
        },
      );
    });
  }
}
