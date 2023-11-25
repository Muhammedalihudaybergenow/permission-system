import { DataSource, Repository } from 'typeorm';
import { PermissionEntity } from 'src/modules/users/permissions/entities';
import { Injectable } from '@nestjs/common';
import { RoleEntity } from 'src/modules/users/roles/entities';
import {
  QueryPermissionDto,
  UpdatePermissionDto,
} from 'src/modules/users/permissions/dto';
@Injectable()
export class ManagerPermissionRepository extends Repository<PermissionEntity> {
  constructor(private dataSource: DataSource) {
    super(PermissionEntity, dataSource.createEntityManager());
  }

  createAndSave(dto: UpdatePermissionDto, id?: number) {
    const entity = new PermissionEntity(dto);
    if (dto.roleIds) {
      entity.roles = dto.roleIds.map(
        (roleId) =>
          new RoleEntity({
            id: roleId,
          }),
      );
    }
    if (id) {
      entity.id = id;
    }
    return this.save(entity);
  }

  findAll(dto: QueryPermissionDto) {
    const { limit, roleIds, search, skip } = dto;
    const query = this.createQueryBuilder('permissions');
    if (search) {
      query.andWhere(
        'permissions.name ILIKE (:search) OR permissions.slug ILIKE (:search',
        { search: `%${search}%` },
      );
    }
    if (roleIds) {
      query
        .leftJoin('permissions.roles', 'roles')
        .andWhere('roles.id IN (:...roleIds)', { roleIds });
    }
    return query
      .select('permissions.id')
      .addSelect(['permissions.name', 'permissions.slug'])
      .take(limit)
      .skip((skip - 1) * limit)
      .getManyAndCount();
  }

  findRelationsById(id: number) {
    return this.createQueryBuilder('permission')
      .leftJoinAndSelect('permission.roles', 'roles')
      .where('permission.id =:id', { id })
      .getOne();
  }
}
