import cookieParser from 'cookie-parser';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { EnvService } from './env/env.service';
import helmet from 'helmet';
import morganConfig from '@/config/morgan.config';
import docsConfig from '@/config/docs.config';
import corsConfig from '@/config/cors.config';
import { ValidationPipe } from '@nestjs/common';
import { PeerServer } from 'peer';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
let peerServer: ReturnType<typeof PeerServer>;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(morganConfig);

  app.setGlobalPrefix('/api/v1');

  app.useGlobalPipes(new ValidationPipe());

  const configService = app.get(EnvService);
  const port = configService.get('APP_PORT');

  peerServer = PeerServer({
    port: configService.get('PEER_PORT'),
    path: '/peer',
  });

  docsConfig(app, '0.3.0');

  app.use(helmet());
  app.use(cookieParser());
  app.enableCors(
    corsConfig(
      configService.get('APP_CLIENT_URL'),
      configService.get('APP_ENV') === 'dev',
    ),
  );

  await app.listen(port);
}
bootstrap();
