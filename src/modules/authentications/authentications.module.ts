import { Module } from '@nestjs/common';
import { AuthenticationsService } from './services/authentications.service';
import { AuthenticationsController } from './controllers/authentications.controller';

@Module({
  controllers: [AuthenticationsController],
  providers: [AuthenticationsService],
})
export class AuthenticationsModule {}
