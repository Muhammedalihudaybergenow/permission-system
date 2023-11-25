import { PermissionEntity } from 'src/modules/users/permissions/entities';
import { RoleEntity } from 'src/modules/users/roles/entities';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
const permissionSeeds: Partial<PermissionEntity>[] = [
  {
    name: 'Manager Users Creating',
    slug: 'manager.users.users.create',
  },
  {
    name: 'Manager Users Removing',
    slug: 'manager.users.users.remove',
  },
  {
    name: 'Manager Users Updating',
    slug: 'manager.users.users.update',
  },
  {
    name: 'Manager Users Finding All',
    slug: 'manager.users.users.readall',
  },
  {
    name: 'Manager Users Finding One',
    slug: 'manager.users.users,readone',
  },
  {
    name: 'Manager Roles Creating',
    slug: 'manager.users.roles.create',
  },
  {
    name: 'Manager Roles Removing',
    slug: 'manager.users.roles.remove',
  },
  {
    name: 'Manager Roles Updating',
    slug: 'manager.users.roles.update',
  },
  {
    name: 'Manager Roles Finding All',
    slug: 'manager.users.roles.readall',
  },
  {
    name: 'Manager Roles Finding One',
    slug: 'manager.users.roles.readone',
  },
  {
    name: 'Manager Permissions Creating',
    slug: 'manager.users.permissions.create',
  },
  {
    name: 'Manager Permissions Removing',
    slug: 'manager.users.permissions.remove',
  },
  {
    name: 'Manager Permissions Finding All',
    slug: 'manager.users.permissions.readall',
  },
  {
    name: 'Manager Permissions Finding One',
    slug: 'manager.users.permissions.readone',
  },
  {
    name: 'Manager Files Creation',
    slug: 'manager.users.files.create',
  },
  {
    name: 'Manager Files Finding All',
    slug: 'manager.users.files.readall',
  },
  {
    name: 'Manager Files Finding One',
    slug: 'manager.users.files.readone',
  },
  {
    name: 'Manager Files Removing',
    slug: 'manager.users.files.remove',
  },
];
export class PermissionSeed implements Seeder {
  async run(dataSource: DataSource): Promise<any> {
    const permissionRepository = dataSource.getRepository(PermissionEntity);
    const roleRepository = dataSource.getRepository(RoleEntity);
    const manager = await roleRepository.findOneBy({
      slug: 'manager',
    });
    for (let i = 0; i < permissionSeeds.length; i++) {
      const element = permissionSeeds[i];
      const permissionCheck = await permissionRepository.findOneBy({
        slug: element.slug,
      });
      if (!permissionCheck) {
        await permissionRepository.save({
          name: element.name,
          slug: element.slug,
          roles: [manager],
        });
      }
    }
  }
}
