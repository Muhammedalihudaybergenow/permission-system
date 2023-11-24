import { Module } from '@nestjs/common';
import { ManagerUsersService } from './services/manager-users.service';
import { ManagerUsersController } from 'src/modules/users/controllers';
import { RolesModule } from './roles/roles.module';
import { PermissionsModule } from './permissions/permissions.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/modules/users/entities';
import {
  ManagerUserRepository,
  UserRepository,
} from 'src/modules/users/repositories';
@Module({
  controllers: [ManagerUsersController],
  providers: [ManagerUsersService, UserRepository, ManagerUserRepository],
  imports: [
    RolesModule,
    PermissionsModule,
    TypeOrmModule.forFeature([UserEntity]),
  ],
  exports: [UserRepository],
})
export class UsersModule {}
