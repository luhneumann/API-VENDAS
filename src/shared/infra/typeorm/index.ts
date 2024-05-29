import { DataSource } from 'typeorm';

//Aqui deve ser importada cada entidade

//Aqui deve ser importada cada migration
import { CreateProducts1716916478931 } from './migrations/1716916478931-CreateProducts';
import Product from '@modules/products/typeorm/entities/product';

export const dataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 54322,
  username: 'postgres',
  password: 'docker',
  database: 'apivendas',
  entities: [Product],
  migrations: [CreateProducts1716916478931],
});
