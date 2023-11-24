import { UserStatusEnum } from 'src/helpers/enums';
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ManagerUserRepository } from 'src/modules/users/repositories';
import { JwtPayload } from 'src/modules/authentications/interfaces';
import { ConstantHelper } from 'src/helpers/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(
  Strategy,
  ConstantHelper.getJwtKey(),
) {
  constructor(
    private configService: ConfigService,
    private userRepository: ManagerUserRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  async validate(payload: JwtPayload) {
    const { id } = payload;
    if (!id) {
      throw new NotFoundException();
    }
    const user = await this.userRepository.findUserById(id);
    if (!user) {
      throw new NotFoundException();
    }
    if (user.status === UserStatusEnum.BLOCKED) {
      throw new ForbiddenException('User is blocked');
    }
    if (user.status === UserStatusEnum.DEACTIVE) {
      throw new ForbiddenException('User is deactived');
    }
    return user;
  }
}
