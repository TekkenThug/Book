import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

const config = new DocumentBuilder()
    .setTitle('Books API documentation')
    .setVersion('0.2.0')
    .addTag('Auth', 'Authentication system')
    .addTag('Books', 'Work with books')
    .addTag('Events', 'Work with book events')
    .addTag('Records', 'Work with records to events')
    .addTag('User', 'Work with users')
    .addTag('Rooms', 'Work with meeting rooms')
    .build();

export default (app: INestApplication) => {
    return SwaggerModule.setup('api/v1/docs', app, SwaggerModule.createDocument(app, config));
}