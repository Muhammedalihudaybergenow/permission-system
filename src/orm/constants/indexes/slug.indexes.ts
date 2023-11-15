import { TableIndexOptions } from 'typeorm';

export const slugIndex: TableIndexOptions = {
  columnNames: ['slug'],
  isNullFiltered: false,
  isUnique: true,
};
