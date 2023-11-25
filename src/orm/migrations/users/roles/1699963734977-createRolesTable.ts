import { idColumn, slugColumn } from 'src/orm/constants/columns';
import { idIndex, slugIndex } from 'src/orm/constants/indexes';
import { MigrationInterface, QueryRunner, Table } from 'typeorm';

const tableName = 'roles';
export class CreateRolesTable1699963734977 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: tableName,
        columns: [
          idColumn,
          {
            name: 'name',
            type: 'varchar',
            isNullable: false,
            length: '255',
          },
          slugColumn,
        ],
        indices: [idIndex, slugIndex],
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
