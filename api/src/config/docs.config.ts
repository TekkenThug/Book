import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export default (app: INestApplication, version: string) => {
  const config = new DocumentBuilder()
    .setTitle('Books API documentation')
    .setVersion(version)
    .addTag('Auth', 'Authentication system')
    .addTag('Books', 'Work with books')
    .addTag('Events', 'Work with book events')
    .addTag('Records', 'Work with records to events')
    .addTag('Rooms', 'Work with meeting rooms')
    .addTag('User', 'Work with users')
    .build();

  return SwaggerModule.setup(
    'api/v1/docs',
    app,
    SwaggerModule.createDocument(app, config),
    {
      yamlDocumentUrl: 'api/v1/docs/yaml',
    },
  );
};
