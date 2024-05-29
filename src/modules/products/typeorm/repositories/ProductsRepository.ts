import { dataSource } from '@shared/infra/typeorm';
import Product from '../entities/product';

export const ProductRepository = dataSource.getRepository(Product).extend({
  async findByName(name: string): Promise<Product | null> {
    const product = this.findOne({
      where: {
        name,
      },
    });

    return product;
  },
});
