import { Module } from '@nestjs/common';
import { ManagerPermissionsService } from 'src/modules/users/permissions/services';
import { ManagerPermissionsController } from 'src/modules/users/permissions/controllers';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermissionEntity } from 'src/modules/users/permissions/entities';
import { ManagerPermissionRepository } from 'src/modules/users/permissions/repositories';
@Module({
  imports: [TypeOrmModule.forFeature([PermissionEntity])],
  controllers: [ManagerPermissionsController],
  providers: [ManagerPermissionsService, ManagerPermissionRepository],
})
export class PermissionsModule {}
