import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PermissionEntity } from 'src/modules/users/permissions/entities';
import { UserEntity } from 'src/modules/users/entities';
@Entity({
  name: 'roles',
})
export class RoleEntity {
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
    unique: true,
  })
  slug: string;

  @ManyToMany(() => PermissionEntity, (permissions) => permissions.roles)
  permissions: PermissionEntity[];

  @ManyToMany(() => UserEntity, (users) => users.roles)
  @JoinTable({
    name: 'users_roles',
    joinColumn: {
      name: 'role_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
  })
  users: UserEntity[];

  constructor(entity?: Partial<RoleEntity>) {
    Object.assign(this, entity);
  }
}
