import { DateEntity } from 'src/helpers/entities';
import { LanguageEnum, UserStatusEnum } from 'src/helpers/enums';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { RoleEntity } from 'src/modules/users/roles/entities';
import { PermissionEntity } from 'src/modules/users/permissions/entities';
@Entity({
  name: 'users',
})
export class UserEntity extends DateEntity {
  @PrimaryGeneratedColumn({
    name: 'id',
    type: 'integer',
  })
  id: number;

  @Column({
    name: 'phonenumber',
    type: 'varchar',
    nullable: false,
    unique: true,
  })
  phonenumber: number;

  @Column({
    name: 'password',
    type: 'varchar',
    nullable: false,
  })
  password: string;

  @Column({
    name: 'lang',
    type: 'integer',
    nullable: false,
  })
  lang: LanguageEnum;

  @Column({
    name: 'is_super_user',
    type: 'boolean',
    nullable: false,
  })
  isSuperUser: boolean;

  @Column({
    name: 'status',
    type: 'integer',
    nullable: false,
  })
  status: UserStatusEnum.ACTIVE;

  @ManyToMany(() => RoleEntity, (roles) => roles.users, { cascade: true })
  roles: RoleEntity[];

  @ManyToMany(() => PermissionEntity, (permissions) => permissions.users)
  permissions: PermissionEntity[];

  constructor(entity: Partial<UserEntity>) {
    super();
    Object.assign(this, entity);
  }
}
