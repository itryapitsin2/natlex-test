import { DataSource } from 'typeorm';
import { DataSourceOptions } from 'typeorm/data-source/DataSourceOptions';

export const DatabaseConfig = {
  type: 'postgres',
  host: 'localhost',
  port: 16544,
  username: 'natlexuser',
  password: 'natlexuser',
  database: 'natlex_test',
  synchronize: true,
  logging: true,
  autoLoadEntities: true,
};

export const AppDataSource = new DataSource({
  ...DatabaseConfig,
  dropSchema: true,
  entities: ['./src/**/*.entity.{ts, js}'],
  migrations: ['./src/migrations/*.{ts, js}'],
  cli: {
    migrationsDir: './dist/migrations',
  },
} as DataSourceOptions);
