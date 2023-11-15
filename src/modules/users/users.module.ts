import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { RolesModule } from './roles/roles.module';
import { PermissionsModule } from './permissions/permissions.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [RolesModule, PermissionsModule],
})
export class UsersModule {}
