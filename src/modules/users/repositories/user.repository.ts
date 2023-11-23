import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { UserEntity } from 'src/modules/users/entities';

@Injectable()
export class UserRepository extends Repository<UserEntity> {
  constructor(dataSource: DataSource) {
    super(UserEntity, dataSource.createEntityManager());
  }

  findOneByPhonenumber(phonenumber: number): Promise<UserEntity> {
    return this.createQueryBuilder('user')
      .leftJoinAndSelect('user.roles', 'roles')
      .leftJoinAndSelect('roles.permissions', 'permissions')
      .leftJoinAndSelect('user.permissions', 'userPermissions')
      .where('user.phonenumber = :phonenumber', { phonenumber })
      .getOne();
  }
}
