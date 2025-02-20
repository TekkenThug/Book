import cookieParser from 'cookie-parser';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { EnvService } from './env/env.service';
import helmet from 'helmet';
import morganConfig from '@/config/morgan.config';
import docsConfig from '@/config/docs.config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(morganConfig);

  app.setGlobalPrefix('/api/v1');

  app.useGlobalPipes(new ValidationPipe());

  const configService = app.get(EnvService);
  const port = configService.get('APP_PORT');

  docsConfig(app);

  app.use(helmet());
  app.use(cookieParser());
  app.enableCors({
    credentials: true,
    origin: (origin: string, cb: (a: null | Error, b?: boolean) => void) => {
      if (
        (origin && configService.get('APP_CLIENT_URL')) ||
        (!origin && configService.get('APP_ENV') === 'dev')
      ) {
        cb(null, true);
      } else {
        cb(new Error('Not allowed by CORS'));
      }
    },
  });

  await app.listen(port);
}
bootstrap();
