import { LanguageEnum, UserStatusEnum } from 'src/helpers/enums';
import { PermissionEntity } from 'src/modules/users/permissions/entities';
import { RoleEntity } from 'src/modules/users/roles/entities';
import { TokenInterface } from 'src/modules/authentications/interfaces';
import { UserEntity } from 'src/modules/users/entities';
export class UserResponseDto {
  id: number;
  phonenumber: number;
  lang: LanguageEnum;
  isSuperUser: boolean;
  status: UserStatusEnum;
  roles: RoleEntity[];
  additionalPermissions: PermissionEntity[];
  tokens: TokenInterface;

  constructor(entity: UserEntity, tokens: TokenInterface) {
    this.id = entity.id;
    this.phonenumber = entity.phonenumber;
    this.isSuperUser = entity.isSuperUser;
    this.status = entity.status;
    this.roles = entity.roles;
    this.additionalPermissions = entity.permissions;
    this.tokens = tokens;
    this.lang = entity.lang;
  }
}
