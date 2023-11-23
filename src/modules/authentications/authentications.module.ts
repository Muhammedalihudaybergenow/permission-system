import { Module } from '@nestjs/common';
import {
  AuthenticationsService,
  TokenService,
} from 'src/modules/authentications/services';
import { AuthenticationsController } from 'src/modules/authentications/controllers';
import { UsersModule } from 'src/modules/users/users.module';
import { UsersService } from 'src/modules/users/services';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

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
  providers: [AuthenticationsService, UsersService, TokenService],
})
export class AuthenticationsModule {}
