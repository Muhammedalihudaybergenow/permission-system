import * as bcryptjs from 'bcryptjs';

export class HashHelper {
  static async getHash(val: string): Promise<string> {
    return bcryptjs.hashSync(val, 12);
  }

  static async compareHash(val: string, hash: string): Promise<boolean> {
    return bcryptjs.compareSync(val, hash);
  }
}
