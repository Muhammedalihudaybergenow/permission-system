import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import * as dotenv from 'dotenv';
dotenv.config();
export class SwaggerConfiguration {
  static config() {
    return new DocumentBuilder()
      .setTitle(process.env.SWAGGER_TITLE)
      .setDescription(process.env.SWAGGER_DESCRIPTION)
      .setVersion(process.env.SWAGGER_VERSION)
      .build();
  }
}
