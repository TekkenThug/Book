import "dotenv/config";
import { z } from "zod";

const EnvSchema = z.object({
  APP_URL: z.string().url(),
  APP_WHITELIST: z.string(),
  DB_HOST: z.string(),
  DB_PORT: z.coerce.number(),
  DB_NAME: z.string(),
  DB_USER: z.string(),
  DB_PASSWORD: z.string(),
  JWT_SECRET: z.string(),
  JWT_ACCESS_EXPIRATION_MINUTES: z.coerce.number().default(30),
  JWT_REFRESH_EXPIRATION_DAYS: z.coerce.number().default(30),
  JWT_EMAIL_VERIFY_EXPIRATION_MINUTES: z.coerce.number().default(30),
  NODE_ENV: z.union([z.literal("prod"), z.literal("dev")]),
  PORT: z.coerce.number().default(8000),
  SMTP_HOST: z.string(),
  SMTP_PORT: z.coerce.number(),
  SMTP_USER: z.string(),
  SMTP_PASSWORD: z.string(),
});

const env = EnvSchema.parse(process.env);

export default {
  appUrl: env.APP_URL,
  appWhitelist: env.APP_WHITELIST.split(";"),
  appVersion: process.env.npm_package_version as string,
  db: {
    host: env.DB_HOST,
    port: +env.DB_PORT,
    name: env.DB_NAME,
    user: env.DB_USER,
    password: env.DB_PASSWORD,
  },
  env: env.NODE_ENV,
  port: env.PORT,
  jwt: {
    secret: env.JWT_SECRET,
    accessExpirationMinutes: env.JWT_ACCESS_EXPIRATION_MINUTES,
    refreshExpirationDays: env.JWT_REFRESH_EXPIRATION_DAYS,
    emailVerifyExpirationMinutes: env.JWT_EMAIL_VERIFY_EXPIRATION_MINUTES,
  },
  smtp: {
    host: env.SMTP_HOST,
    port: env.SMTP_PORT,
    user: env.SMTP_USER,
    password: env.SMTP_PASSWORD,
  },
};
