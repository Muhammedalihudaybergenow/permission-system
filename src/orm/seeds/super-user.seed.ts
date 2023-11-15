import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { UserEntity } from 'src/modules/users/entities';
import { HashHelper } from 'src/helpers/hash';
import { LanguageEnum } from 'src/helpers/enums';
const superUserSeed: Partial<UserEntity> = {
  phonenumber: 62123456,
  password: 'Hello123',
};
export class SuperUserSeed implements Seeder {
  async run(dataSource: DataSource) {
    const userRepository = dataSource.getRepository(UserEntity);
    const checkUser = await userRepository
      .createQueryBuilder('users')
      .where('user.phonenumber =:phonenumber', {
        phonenumber: superUserSeed.phonenumber,
      })
      .getOne();
    if (checkUser) {
      const superUserEntity = new UserEntity({
        phonenumber: superUserSeed.phonenumber,
        password: await HashHelper.getHash(superUserSeed.password),
        lang: LanguageEnum.ALL,
      });
      await userRepository.save(superUserEntity);
    }
  }
}
