import cookieParser from 'cookie-parser';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { EnvService } from './env/env.service';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import morgan from 'morgan';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(morgan('tiny'))

  app.setGlobalPrefix('/api/v1');

  app.useGlobalPipes(new ValidationPipe());

  const configService = app.get(EnvService);
  const port = configService.get('PORT');

  const config = new DocumentBuilder()
    .setTitle('Books API documentation')
    .setVersion('0.2.0')
    .addTag('Auth', 'Authentication system')
    .addTag('Books', 'Work with books')
    .addTag('Events', 'Work with book events')
    .addTag('Records', 'Work with records to events')
    .addTag('User', 'Work with users')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/v1/docs', app, document);

  app.use(helmet());
  app.use(cookieParser());
  app.enableCors({
    credentials: true,
    origin: (origin, cb) => {
      if (
        (origin && configService.get('APP_CLIENT_URL')) ||
        (!origin && configService.get('NODE_ENV') === 'dev')
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
