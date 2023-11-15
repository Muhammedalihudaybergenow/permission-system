import { Controller, Post } from '@nestjs/common';
import { AuthenticationsService } from '../services/authentications.service';
import { LoginDto } from 'src/modules/authentications/dto';
@Controller('authentications')
export class AuthenticationsController {
  constructor(
    private readonly authenticationsService: AuthenticationsService,
  ) {}

  @Post('login')
  login(dto: LoginDto) {}
}
