import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';
import { SeederOptions } from 'typeorm-extension';

dotenv.config();
const dataSourceOptions: DataSourceOptions & SeederOptions = {
  type: 'postgres',
  database: process.env.TYPEORM_DATABASE_NAME,
  username: process.env.TYPEORM_DATABASE_USERNAME,
  password: process.env.TYPEORM_DATABASE_PASSWORD,
  host: process.env.TYPEORM_DATABASE_HOST,
  port: parseInt(process.env.TYPEORM_DATABASE_PORT),
  migrations: ['dist/**/migrations/**/*.{js,ts}'],
  entities: ['dist/modules/**/*.entity.{js,ts}'],
  seeds: [],
  synchronize:
    process.env.TYPEORM_DATABASE_SYNCHRONIZE == 'true' ? true : false,
  cache: {
    type: 'redis',
    duration: parseInt(process.env.TYPEORM_DATABASE_CACHE_DURATION),
    alwaysEnabled: true,
    options: {
      port: process.env.REDIS_PORT,
      host: process.env.REDIS_HOST,
    },
  },
};

export default new DataSource(dataSourceOptions);
