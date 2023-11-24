import { Injectable } from '@nestjs/common';
import {
  CreateRoleDto,
  UpdateRoleDto,
  QueryRolePaginationDto,
} from 'src/modules/users/roles/dto';
import { RoleEntity } from 'src/modules/users/roles/entities';
import { ManagerRoleRepository } from 'src/modules/users/roles/repositories';
@Injectable()
export class ManagerRolesService {
  constructor(private managerRoleRepository: ManagerRoleRepository) {}
  create(createRoleDto: CreateRoleDto) {
    return this.managerRoleRepository.createAndSave(createRoleDto);
  }

  findAll(dto: QueryRolePaginationDto) {
    return this.managerRoleRepository.findAll(dto);
  }

  findOne(id: number) {
    return this.managerRoleRepository.findRelationsById(id);
  }

  update(id: number, updateRoleDto: UpdateRoleDto) {
    return this.managerRoleRepository.createAndSave(updateRoleDto, id);
  }

  remove(id: number) {
    return this.managerRoleRepository.remove(
      new RoleEntity({
        id,
      }),
    );
  }
}
