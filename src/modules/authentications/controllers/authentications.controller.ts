import { Body, Controller, Post } from '@nestjs/common';
import { AuthenticationsService } from 'src/modules/authentications/services';
import { LoginDto, TokenDto } from 'src/modules/authentications/dto';
import { ApiTags } from '@nestjs/swagger';
@Controller({
  path: 'authentications',
  version: '1',
})
@ApiTags('Authentication Controller')
export class AuthenticationsController {
  constructor(
    private readonly authenticationsService: AuthenticationsService,
  ) {}

  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.authenticationsService.login(dto);
  }

  @Post('validate/token')
  validateToken(@Body() body: TokenDto) {
    return this.authenticationsService.validateToken(body.token);
  }

  @Post('generate/token')
  generateToken(@Body() body: TokenDto) {
    return this.authenticationsService.generateToken(body.token);
  }
}
