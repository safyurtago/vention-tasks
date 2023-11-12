import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MessageModule } from './message.module';

async function bootstrap() {
  const app = await NestFactory.create(MessageModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());

  const configService = app.get(ConfigService);

  await app.listen(configService.get('PORT'), () => {
    console.log("listening on port " + configService.get('PORT'));
  });
}
bootstrap();
