import { Module } from '@nestjs/common';
import { ManagerRolesController } from 'src/modules/users/roles/controllers';
import { ManagerRolesService } from 'src/modules/users/roles/services';
import { RoleEntity } from 'src/modules/users/roles/entities';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ManagerRoleRepository } from 'src/modules/users/roles/repositories';
@Module({
  imports: [TypeOrmModule.forFeature([RoleEntity])],
  controllers: [ManagerRolesController],
  providers: [ManagerRolesService, ManagerRoleRepository],
})
export class RolesModule {}
