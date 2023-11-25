import { Module } from '@nestjs/common';
import {
  AuthenticationsService,
  TokenService,
} from 'src/modules/authentications/services';
import { AuthenticationsController } from 'src/modules/authentications/controllers';
import { UsersModule } from 'src/modules/users/users.module';
import { ManagerUserRepository } from 'src/modules/users/repositories';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  BasicStrategy,
  JwtStrategy,
} from 'src/modules/authentications/strategies';

@Module({
  imports: [
    UsersModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => {
        return {
          secret: config.get('JWT_SECRET'),
          signOptions: {
            expiresIn: config.get('JWT_ACCESS_EXPIRES_IN'),
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthenticationsController],
  providers: [
    AuthenticationsService,
    BasicStrategy,
    JwtStrategy,
    ManagerUserRepository,
    TokenService,
  ],
})
export class AuthenticationsModule {}
