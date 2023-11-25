import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import * as dotenv from 'dotenv';
import { SwaggerModule } from '@nestjs/swagger';
import { SwaggerConfiguration } from 'src/modules/configuration/swagger';
import { ValidationPipe, VersioningType } from '@nestjs/common';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableVersioning({
    prefix: 'v',
    type: VersioningType.URI,
  });
  app.enableCors({
    origin: '*',
  });
  app.useGlobalPipes(
    new ValidationPipe({
      always: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  const document = SwaggerModule.createDocument(
    app,
    SwaggerConfiguration.config(),
  );
  SwaggerModule.setup('docs/swagger', app, document);
  await app.listen(parseInt(process.env.SERVER_PORT));
}
bootstrap();
