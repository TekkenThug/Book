import { Injectable } from '@nestjs/common';
import { createTransport } from 'nodemailer';
import { EnvService } from '@/env/env.service';

@Injectable()
export class MailService {
  constructor(private envService: EnvService) {}

  private readonly mailer = createTransport(
    {
      host: this.envService.get('SMTP_HOST'),
      port: this.envService.get('SMTP_PORT'),
      secure: true,
      auth: {
        user: this.envService.get('SMTP_USER'),
        pass: this.envService.get('SMTP_PASSWORD'),
      },
    },
    {
      from: `Books ${this.envService.get('SMTP_USER')}`,
    },
  );

  public sendWelcomeMail(email: string, name: string, token: string) {
    const url = new URL(this.envService.get('APP_CLIENT_URL'));
    url.searchParams.append('emailToken', token);

    this.mailer.sendMail({
      to: email,
      subject: 'Welcome to the platform!',
      html: `<h1>Hello, ${name}!</h1> <p>Please, <a href="${url}">confirm your email</a> for further work.</p>`,
    });
  }
}
