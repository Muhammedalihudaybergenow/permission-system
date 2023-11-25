import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { RoleEntity } from 'src/modules/users/roles/entities';
import {
  QueryRolePaginationDto,
  UpdateRoleDto,
} from 'src/modules/users/roles/dto';
import { PermissionEntity } from 'src/modules/users/permissions/entities';
@Injectable()
export class ManagerRoleRepository extends Repository<RoleEntity> {
  constructor(private dataSource: DataSource) {
    super(RoleEntity, dataSource.createEntityManager());
  }

  createAndSave(dto: UpdateRoleDto, id?: number) {
    const entity = new RoleEntity(dto);
    if (dto.permissionIds) {
      entity.permissions = dto.permissionIds.map(
        (permissionId) =>
          new PermissionEntity({
            id: permissionId,
          }),
      );
    }
    if (id) {
      entity.id = id;
    }
    return this.save(entity);
  }

  findAll(dto: QueryRolePaginationDto) {
    const { limit, permissionIds, search, skip } = dto;
    const query = this.createQueryBuilder('roles');
    if (permissionIds) {
      query
        .leftJoin('roles.permissions', 'permissions')
        .andWhere('permissions.id IN (:...permissionIds)', { permissionIds });
    }
    if (search) {
      query.andWhere(
        'roles.name ILIKE (:search) OR roles.slug ILIKE (:search)',
        { search: `%${search}%` },
      );
    }
    return query
      .take(limit)
      .skip((skip - 1) * limit)
      .getManyAndCount();
  }

  findRelationsById(id: number) {
    return this.createQueryBuilder('role')
      .leftJoinAndSelect('role.permissions', 'permissions')
      .where('permissions.id =:id', { id })
      .getOne();
  }
}
