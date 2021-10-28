import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // APIのURLを全て「/api」から始まるようにする
  app.setGlobalPrefix('api');

  // CORS対応
  app.enableCors();

  // Swagger拡張の有効化
  const config = new DocumentBuilder()
    .setTitle('API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  await app.listen(4000);
}
bootstrap();
