import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import * as hbs from 'nodemailer-express-handlebars';
import { iForgetCode } from './interface/forget.code';
import { IRegisterCode } from './interface/register.code';

@Injectable()
export class MailService {
  private transporter;
  private options;

  constructor(private readonly configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.configService.get<string>('EMAIL_HOST'),
      port: this.configService.get<number>('EMAIL_PORT'),
      secureConnection: false,
      auth: {
        user: this.configService.get<string>('EMAIL_USER'), // generated user
        pass: this.configService.get<string>('EMAIL_PASS'), // generated password
      },
      tls: {
        ciphers: 'SSLv3',
      },
    });
  }

  private async sendRegisterEmail(to: string, code: number): Promise<boolean> {
    const mailInfo = {
      from: '"Tonet" <info@tonet.me>',
      to,
      subject: 'Register yor Tonet account',
      template: 'main',
      context: { code },
    };
    this.options = {
      viewEngine: {
        partialsDir: './src/mail/views/partials',
        layoutsDir: './src//mail/views/welcome',
        extname: '.hbs',
      },
      extName: '.hbs',
      viewPath: './src/mail/views/welcome',
    };
    this.transporter.use('compile', hbs(this.options));

    const info = await this.transporter.sendMail(mailInfo);
    if (!info) return false;
    return true;
  }

  private async sendForgetEmail(
    to: string,
    forgetCode: number,
  ): Promise<boolean> {
    const mailInfo = {
      from: '"Tonet" <info@tonet.me>',
      to,
      subject: 'Forget password',
      template: 'main',
      context: { forgetCode },
    };
    this.options = {
      viewEngine: {
        partialsDir: './src/mail/views/partials',
        layoutsDir: './src//mail/views/forget-password',
        extname: '.hbs',
      },
      extName: '.hbs',
      viewPath: './src/mail/views/forget-password',
    };
    this.transporter.use('compile', hbs(this.options));

    const info = await this.transporter.sendMail(mailInfo);
    console.log(info);

    if (!info) return false;
    return true;
  }

  public async sendRegisterCode(data: IRegisterCode): Promise<boolean> {
    const { code, email } = data;
    return this.sendRegisterEmail(email, code);
  }

  public async sendForgetCode(data: iForgetCode): Promise<boolean> {
    const { forgetCode, email } = data;
    return this.sendForgetEmail(email, forgetCode);
  }
}
