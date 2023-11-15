import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import * as dotenv from 'dotenv';
import { SwaggerModule } from '@nestjs/swagger';
import { SwaggerConfiguration } from 'src/modules/configuration/swagger';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const document = SwaggerModule.createDocument(
    app,
    SwaggerConfiguration.config(),
  );
  SwaggerModule.setup('api', app, document);
  await app.listen(parseInt(process.env.SERVER_PORT));
}
bootstrap();
