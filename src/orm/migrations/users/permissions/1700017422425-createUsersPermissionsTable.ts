import { MigrationInterface, QueryRunner, Table } from 'typeorm';
const tableName = 'users_permissions';
const usersTableName = 'users';
const permissionsTableName = 'permissions';
export class CreateUsersPermissionsTable1700017422425
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: tableName,
        columns: [
          {
            name: 'user_id',
            type: 'integer',
            isNullable: false,
          },
          {
            name: 'permission_id',
            type: 'integer',
            isNullable: false,
          },
        ],
        indices: [
          {
            columnNames: ['user_id', 'permission_id'],
          },
          {
            columnNames: ['user_id'],
          },
          {
            columnNames: ['permission_id'],
          },
        ],
        foreignKeys: [
          {
            columnNames: ['user_id'],
            referencedColumnNames: ['id'],
            referencedTableName: usersTableName,
          },
          {
            columnNames: ['permission_id'],
            referencedColumnNames: ['id'],
            referencedTableName: permissionsTableName,
          },
        ],
      }),
      true,
      true,
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(tableName, true, true, true);
  }
}
