import { idColumn } from 'src/orm/constants/columns';
import { idIndex } from 'src/orm/constants/indexes';
import { MigrationInterface, QueryRunner, Table } from 'typeorm';

const tableName = 'files';
export class CreateFilesTable1700882932049 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: tableName,
        columns: [
          idColumn,
          {
            name: 'path',
            type: 'varchar',
            length: '255',
            isNullable: false,
          },
          {
            name: 'size',
            type: 'integer',
            isNullable: false,
          },
          {
            name: 'hash',
            type: 'varchar',
            length: '255',
            isNullable: false,
          },
          {
            name: 'mimetype',
            type: 'varchar',
            length: '20',
            isNullable: false,
          },
        ],
        indices: [
          idIndex,
          {
            columnNames: ['path'],
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
