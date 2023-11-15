import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { LanguageEntity } from 'src/modules/languages/entities';
import { UserEntity } from 'src/modules/users/entities';
import { HashHelper } from 'src/helpers/hash';
const superUserSeed: Partial<UserEntity> = {
  phonenumber: 62123456,
  password: 'Hello123',
};
export class SuperUserSeed implements Seeder {
  async run(dataSource: DataSource) {
    const languageRepository = dataSource.getRepository(LanguageEntity);
    const defaultLanguage = await languageRepository.findOneBy({
      isDefault: true,
    });
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
      });
      await userRepository.save(superUserEntity);
    }
  }
}
