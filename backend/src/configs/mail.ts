import { createTransport } from "nodemailer";
import config from "@/configs/config";

const mailer = createTransport(
  {
    host: config.smtp.host,
    port: config.smtp.port,
    secure: true,
    auth: {
      user: config.smtp.user,
      pass: config.smtp.password,
    },
  },
  {
    from: `Books ${config.smtp.user}`,
  },
);

export default mailer;
