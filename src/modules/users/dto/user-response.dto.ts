import { LanguageEnum, UserStatusEnum } from 'src/helpers/enums';
import { RoleEntity } from 'src/modules/users/roles/entities';
import { PermissionEntity } from 'src/modules/users/permissions/entities';
import { UserEntity } from 'src/modules/users/entities';
export class UserResponseDto {
  id: number;
  phonenumber: number;
  lang: LanguageEnum;
  isSuperUser: boolean;
  status: UserStatusEnum;
  roles: RoleEntity[];
  permissions: PermissionEntity[];
  constructor(user: UserEntity) {
    this.id = user.id;
    this.phonenumber = user.phonenumber;
    this.lang = user.lang;
    this.isSuperUser = user.isSuperUser;
    this.status = user.status;
    this.roles = user.roles;
    this.permissions = user.permissions;
  }
}
