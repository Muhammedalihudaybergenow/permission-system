import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { UserEntity } from 'src/modules/users/entities';
import { HashHelper } from 'src/helpers/hash';
import { LanguageEnum, UserStatusEnum } from 'src/helpers/enums';
import { RoleEntity } from 'src/modules/users/roles/entities';
import { DateHelpers } from 'src/helpers/common';
const superUserSeed: Partial<UserEntity> = {
  phonenumber: 62123456,
  password: 'Hello123',
  lang: LanguageEnum.ALL,
  status: UserStatusEnum.ACTIVE,
};
export class SuperUserSeed implements Seeder {
  async run(dataSource: DataSource) {
    const userRepository = dataSource.getRepository(UserEntity);
    const roleRepository = dataSource.getRepository(RoleEntity);
    const manager = await roleRepository.findOneBy({
      slug: 'manager',
    });
    const checkUser = await userRepository
      .createQueryBuilder('users')
      .where('users.phonenumber =:phonenumber', {
        phonenumber: superUserSeed.phonenumber,
      })
      .getOne();
    if (!checkUser) {
      const superUserEntity = new UserEntity({
        phonenumber: superUserSeed.phonenumber,
        password: await HashHelper.getHash(superUserSeed.password),
        lang: superUserSeed.lang,
        status: superUserSeed.status,
        roles: [manager],
        isSuperUser: true,
        createdAt: DateHelpers.currentTime(),
        updatedAt: DateHelpers.currentTime(),
      });
      await userRepository.save(superUserEntity);
    }
  }
}
