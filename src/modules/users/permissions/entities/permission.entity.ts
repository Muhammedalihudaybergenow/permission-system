import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { RoleEntity } from 'src/modules/users/roles/entities';
import { UserEntity } from 'src/modules/users/entities';
@Entity({
  name: 'permissions',
})
export class PermissionEntity {
  @PrimaryGeneratedColumn({
    name: 'id',
    type: 'integer',
  })
  id: number;

  @Column({
    name: 'name',
    type: 'varchar',
    nullable: false,
  })
  name: string;

  @Column({
    name: 'slug',
    type: 'varchar',
    nullable: false,
  })
  slug: string;

  @ManyToMany(() => RoleEntity, (roles) => roles.permissions)
  @JoinTable({
    name: 'roles_permissions',
    joinColumn: {
      name: 'permission_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'role_id',
      referencedColumnName: 'id',
    },
  })
  roles: RoleEntity[];

  @ManyToMany(() => UserEntity, (users) => users.permissions)
  @JoinTable({
    name: 'users_permissions',
    joinColumn: {
      name: 'permission_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
  })
  users: UserEntity[];
  constructor(entity?: Partial<PermissionEntity>) {
    Object.assign(this, entity);
  }
}
