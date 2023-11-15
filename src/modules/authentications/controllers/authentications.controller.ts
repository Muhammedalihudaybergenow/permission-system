import { Controller } from '@nestjs/common';
import { AuthenticationsService } from '../services/authentications.service';

@Controller('authentications')
export class AuthenticationsController {
  constructor(
    private readonly authenticationsService: AuthenticationsService,
  ) {}
}
