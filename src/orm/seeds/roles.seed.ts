import { RoleEntity } from 'src/modules/users/roles/entities';
import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
const manager: Partial<RoleEntity> = {
  name: 'MANAGER',
  slug: 'manager',
};
export class RolesSeed implements Seeder {
  async run(dataSource: DataSource) {
    const roleRepository = dataSource.getRepository(RoleEntity);
    const roleEntity = new RoleEntity(manager);
    const checkRole = roleRepository.findOneBy({
      slug: manager.slug,
    });
    if (!manager) {
      await roleRepository.save(roleEntity);
    }
  }
}
