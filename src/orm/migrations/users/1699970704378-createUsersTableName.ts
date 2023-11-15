import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import {
  idColumn,
  createdAtColumn,
  updatedAtColumn,
} from 'src/orm/constants/columns';
import { idIndex } from 'src/orm/constants/indexes';
const tableName = 'users';

export class CreateUsersTableName1699970704378 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: tableName,
        columns: [
          idColumn,
          {
            name: 'phonenumber',
            type: 'varchar',
            isNullable: false,
            isUnique: true,
          },
          {
            name: 'is_super_user',
            type: 'boolean',
            isNullable: false,
          },
          {
            name: 'password',
            type: 'varchar',
            length: '255',
            isNullable: false,
          },
          {
            name: 'lang',
            type: 'integer',
            isNullable: false,
          },
          createdAtColumn,
          updatedAtColumn,
        ],
        indices: [
          {
            columnNames: ['lang'],
          },
          idIndex,
          {
            columnNames: ['phonenumber'],
          },
          {
            columnNames: ['created_at'],
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
