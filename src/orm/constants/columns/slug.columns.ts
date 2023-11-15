import { TableColumnOptions } from 'typeorm';

export const slugColumn: TableColumnOptions = {
  name: 'slug',
  type: 'varchar',
  length: '50',
  isNullable: false,
  isUnique: true,
};
