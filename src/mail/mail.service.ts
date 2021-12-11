import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import * as hbs from 'nodemailer-express-handlebars';
import { IRegisterCode } from './interface/register.code';

@Injectable()
export class MailService {
  private transporter;
  private readonly options;

  constructor(private readonly configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.configService.get<string>('emailHost'),
      port: this.configService.get<number>('emailPort'),
      // service: process.env.NODE_ENV == 'development' ? 'Gmail' : undefined,
      service: 'Gmail',
      secure: this.configService.get<boolean>('EMAIL_SECURE'), // true for 465, false for other ports
      auth: {
        user: this.configService.get<string>('EMAIL_USER'), // generated user
        pass: this.configService.get<string>('EMAIL_PASS'), // generated password
      },
    });
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
  }

  private async sendRegisterEmail(to: string, code: number): Promise<boolean> {
    const mailInfo = {
      from: '"Tonet" <info@tonet.me>',
      to,
      subject: 'Register email',
      template: 'main',
      context: { code },
    };
    const info = await this.transporter.sendMail(mailInfo);
    if (!info) return false;
    return true;
  }

  public async sendRegisterCode(data: IRegisterCode): Promise<boolean> {
    const { code, email } = data;
    return this.sendRegisterEmail(email, code);
  }
}
