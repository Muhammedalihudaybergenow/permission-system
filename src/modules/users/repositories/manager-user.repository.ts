import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { UserEntity } from 'src/modules/users/entities';
import { QueryUserPaginationDto, UpdateUserDto } from 'src/modules/users/dto';
import { HashHelper } from 'src/helpers/hash';
import { RoleEntity } from 'src/modules/users/roles/entities';
import { PermissionEntity } from 'src/modules/users/permissions/entities';
@Injectable()
export class ManagerUserRepository extends Repository<UserEntity> {
  constructor(private dataSource: DataSource) {
    super(UserEntity, dataSource.createEntityManager());
  }

  async createAndSave(user: UpdateUserDto, id?: number) {
    const entity = new UserEntity(user);
    entity.isSuperUser = false;
    if (id) {
      entity.id = id;
    }
    if (user.password) {
      entity.password = await HashHelper.getHash(user.password);
    }
    if (user.roleIds) {
      entity.roles = user.roleIds.map(
        (roleId) =>
          new RoleEntity({
            id: roleId,
          }),
      );
    }
    if (user.permissionIds) {
      entity.permissions = user.permissionIds.map(
        (permissionId) =>
          new PermissionEntity({
            id: permissionId,
          }),
      );
    }
    return this.save(entity);
  }
  findUserById(id: number): Promise<UserEntity> {
    return this.createQueryBuilder('user')
      .leftJoinAndSelect('user.permissions', 'permissions')
      .leftJoinAndSelect('user.roles', 'roles')
      .leftJoinAndSelect('roles.permissions', 'rolePermissions')
      .where('user.id =:id', { id })
      .getOne();
  }

  findAll(dto: QueryUserPaginationDto) {
    const {
      lang,
      limit,
      permissionIds,
      roleIds,
      search,
      skip,
      status,
      orderBy,
      orderDirection,
    } = dto;
    const query = this.createQueryBuilder('users');
    if (roleIds) {
      query.innerJoin('users.roles', 'roles', 'roles.id IN (:...roleIds)', {
        roleIds,
      });
    }
    if (permissionIds) {
      query.innerJoin(
        'users.permissions',
        'permissions',
        'permissions.id IN (:...permissionIds)',
        {
          permissionIds,
        },
      );
    }
    if (lang) {
      query.andWhere('users.lang =:lang', { lang });
    }
    if (status) {
      query.andWhere('users.status =:status', { status });
    }
    if (search) {
      query.andWhere('users.phonenumber ILIKE', { search: `%${search}%` });
    }
    return query
      .select('users.id')
      .addSelect([
        'users.phonenumber',
        'users.lang',
        'users.isSuperUser',
        'users.status',
      ])
      .limit(limit)
      .skip((skip - 1) * limit)
      .orderBy(orderBy, orderDirection)
      .getManyAndCount();
  }

  findRelationsById(id: number) {
    return this.createQueryBuilder('user')
      .leftJoin('user.roles', 'roles')
      .leftJoin('user.permissions', 'permissions')
      .where('user.id =:id', { id })
      .select('user.id')
      .addSelect([
        'user,phonenumber',
        'user.lang',
        'user.status',
        'user.createdAt',
        'user.updatedAt',
        'user.isSuperUser',
        'roles.id',
        'roles.name',
        'roles.slug',
        'permissions.id',
        'permissions.name',
        'permissions.slug',
      ])
      .getOne();
  }
}
