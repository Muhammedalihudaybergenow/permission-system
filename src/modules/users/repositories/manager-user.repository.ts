import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { UserEntity } from 'src/modules/users/entities';
import { UpdateUserDto } from 'src/modules/users/dto';
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
}
