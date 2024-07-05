import mailer from "@/configs/mail";
import config from "@/configs/config";

export default class MailService {
  public static sendWelcomeMail(name: string, token: string) {
    const url = new URL(config.appWhitelist[0]);
    url.searchParams.append("emailToken", token);

    mailer.sendMail({
      to: "ignatov0131@gmail.com",
      subject: "Welcome to the platform!",
      html: `<h1>Hello, ${name}!</h1> <p>Please, <a href="${url}">confirm your email</a> for further work.</p>`,
    });
  }
}
