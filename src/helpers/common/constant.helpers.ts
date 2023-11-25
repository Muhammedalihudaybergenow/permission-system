export class ConstantHelper {
  static getAuthKey(): string {
    return 'basic-auth-key';
  }

  static getJwtKey(): string {
    return 'jwt-guard-key';
  }

  static getPermissionKey(): string {
    return 'permission-guard-key';
  }
}
