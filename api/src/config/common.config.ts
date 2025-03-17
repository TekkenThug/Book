import { IsNumber, IsString, IsUrl, validateSync } from 'class-validator';
import { plainToInstance } from 'class-transformer';

class EnvVariables {
  @IsString()
  APP_URL: string;

  @IsString()
  APP_ENV: string;

  @IsNumber()
  APP_PORT: number;

  @IsUrl()
  APP_CLIENT_URL: string;

  @IsString()
  DB_HOST: string;

  @IsNumber()
  DB_PORT: number;

  @IsString()
  DB_NAME: string;

  @IsString()
  DB_USER: string;

  @IsString()
  DB_PASSWORD: string;

  @IsString()
  JWT_SECRET: string;

  @IsNumber()
  JWT_ACCESS_EXPIRATION_MINUTES: number;

  @IsNumber()
  JWT_REFRESH_EXPIRATION_DAYS: number;

  @IsNumber()
  JWT_RESET_PASSWORD_EXPIRATION_MINUTES: number;

  @IsNumber()
  JWT_EMAIL_VERIFY_EXPIRATION_MINUTES: number;

  @IsString()
  SMTP_HOST: string;

  @IsNumber()
  SMTP_PORT: number;

  @IsString()
  SMTP_USER: string;

  @IsString()
  SMTP_PASSWORD: string;

  @IsString()
  S3_HOST: string;

  @IsString()
  S3_EXTERNAL_URL: string;

  @IsNumber()
  S3_PORT: number;

  @IsString()
  S3_BUCKET: string;

  @IsString()
  S3_ACCESS_KEY: string;

  @IsString()
  S3_SECRET_KEY: string;

  @IsNumber()
  WS_PORT: number;

  @IsNumber()
  PEER_PORT: number;
}

export const validate = (env: Record<string, unknown>) => {
  const validatedConfig = plainToInstance(EnvVariables, env, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
};

export type Env = EnvVariables;
