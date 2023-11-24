import { Injectable } from '@nestjs/common';
import {
  CreatePermissionDto,
  QueryPermissionDto,
  UpdatePermissionDto,
} from 'src/modules/users/permissions/dto';
import { ManagerPermissionRepository } from 'src/modules/users/permissions/repositories';
import { PermissionEntity } from 'src/modules/users/permissions/entities';
@Injectable()
export class ManagerPermissionsService {
  constructor(
    private managerPermissionsRepository: ManagerPermissionRepository,
  ) {}
  create(createPermissionDto: CreatePermissionDto) {
    return this.managerPermissionsRepository.createAndSave(createPermissionDto);
  }

  findAll(dto: QueryPermissionDto) {
    return this.managerPermissionsRepository.findAll(dto);
  }

  findOne(id: number) {
    return this.managerPermissionsRepository.findRelationsById(id);
  }

  update(id: number, updatePermissionDto: UpdatePermissionDto) {
    return this.managerPermissionsRepository.createAndSave(
      updatePermissionDto,
      id,
    );
  }

  remove(id: number) {
    return this.managerPermissionsRepository.remove(
      new PermissionEntity({
        id,
      }),
    );
  }
}
