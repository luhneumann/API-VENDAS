import { DataSource } from 'typeorm';

//Aqui deve ser importada cada entidade

//Aqui deve ser importada cada migration
import { CreateProducts1716916478931 } from './migrations/1716916478931-CreateProducts';
import { CreateUsers1717011851779 } from './migrations/1717011851779-CreateUsers';
import Product from '@modules/products/typeorm/entities/product';
import User from '@modules/users/typeorm/entities/user';

export const dataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 54322,
  username: 'postgres',
  password: '181500',
  database: 'apivendas',
  entities: [Product, User],
  migrations: [CreateProducts1716916478931, CreateUsers1717011851779],
});
