import { TableIndexOptions } from 'typeorm';

export const idIndex: TableIndexOptions = {
  columnNames: ['id'],
  isNullFiltered: false,
  isUnique: true,
};
