import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { idColumn, slugColumn } from 'src/orm/constants/columns';

const tableName = 'permissions';
export class CreatePermissionsTable1699969824283 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: tableName,
        columns: [
          idColumn,
          {
            name: 'name',
            type: 'varchar',
            length: '100',
            isNullable: false,
          },
          slugColumn,
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
