import { TableColumnOptions } from 'typeorm';

export const idColumn: TableColumnOptions = {
  name: 'id',
  type: 'integer',
  isNullable: false,
  isUnique: true,
  isGenerated: true,
  isPrimary: true,
};
