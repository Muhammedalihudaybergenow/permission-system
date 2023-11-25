import { TableColumnOptions } from 'typeorm';

export const createdAtColumn: TableColumnOptions = {
  name: 'created_at',
  type: 'bigint',
  isNullable: false,
};

export const updatedAtColumn: TableColumnOptions = {
  name: 'updated_at',
  type: 'bigint',
  isNullable: false,
};
