import { MigrationInterface, QueryRunner, Table } from 'typeorm';

const tableName = 'users_roles';
const rolesTableName = 'roles';
const usersTableName = 'users';
export class CreateUserRolesTable1700016594073 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: tableName,
        columns: [
          {
            name: 'role_id',
            type: 'integer',
            isNullable: false,
          },
          {
            name: 'user_id',
            type: 'integer',
            isNullable: false,
          },
        ],
        indices: [
          {
            columnNames: ['role_id', 'user_id'],
          },
          {
            columnNames: ['user_id'],
          },
          {
            columnNames: ['role_id'],
          },
        ],
        foreignKeys: [
          {
            columnNames: ['user_id'],
            referencedTableName: usersTableName,
            referencedColumnNames: ['id'],
          },
          {
            columnNames: ['role_id'],
            referencedTableName: rolesTableName,
            referencedColumnNames: ['id'],
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
