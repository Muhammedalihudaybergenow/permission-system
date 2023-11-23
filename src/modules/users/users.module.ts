import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import { RolesModule } from './roles/roles.module';
import { PermissionsModule } from './permissions/permissions.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/modules/users/entities';
import {
  ManagerUserRepository,
  UserRepository,
} from 'src/modules/users/repositories';
@Module({
  controllers: [UsersController],
  providers: [UsersService, UserRepository, ManagerUserRepository],
  imports: [
    RolesModule,
    PermissionsModule,
    TypeOrmModule.forFeature([UserEntity]),
  ],
  exports: [UserRepository],
})
export class UsersModule {}
