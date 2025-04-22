import { Injectable } from '@nestjs/common';
import { createTransport } from 'nodemailer';
import { ConfigService } from '@nestjs/config';
import { Config } from '@/config/common.config';

@Injectable()
export class MailService {
  constructor(private configService: ConfigService<Config>) {}

  private readonly mailer = createTransport(
    {
      host: this.configService.getOrThrow('SMTP_HOST'),
      port: this.configService.getOrThrow('SMTP_PORT'),
      secure: true,
      auth: {
        user: this.configService.getOrThrow('SMTP_USER'),
        pass: this.configService.getOrThrow('SMTP_PASSWORD'),
      },
    },
    {
      from: `Books ${this.configService.getOrThrow('SMTP_USER')}`,
    },
  );

  public sendWelcomeMail(email: string, name: string, token: string) {
    const url = new URL(this.configService.getOrThrow('APP_CLIENT_URL'));
    url.searchParams.append('emailToken', token);

    void this.mailer.sendMail({
      to: email,
      subject: 'Welcome to the platform!',
      html: `<h1>Hello, ${name}!</h1> <p>Please, <a href="${url}">confirm your email</a> for further work.</p>`,
    });
  }

  public sendResetPasswordEmail(email: string, name: string, token: string) {
    const url = new URL(this.configService.getOrThrow('APP_CLIENT_URL'));
    url.searchParams.append('resetToken', token);

    void this.mailer.sendMail({
      to: email,
      subject: 'Reset password',
      html: `<h1>Hello, ${name}!</h1> <p>Please, click to <a href="${url}">this link</a> to reset your passwor.</p><p>If you don't reset password, ignore this letter.</p>`,
    });
  }
}
