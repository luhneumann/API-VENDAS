import { dataSource } from '@shared/infra/typeorm';
import Product from '../entities/product';
import { In } from 'typeorm';

interface IFindProducts {
  id: string;
}

export const ProductRepository = dataSource.getRepository(Product).extend({
  async findByName(name: string): Promise<Product | null> {
    const product = this.findOne({
      where: {
        name,
      },
    });

    return product;
  },

  async findAllByIds(products: IFindProducts[]): Promise<Product[]> {
    const productIds = products.map(product => product.id);

    const existsProducts = await this.find({
      where: {
        id: In(productIds),
      },
    });
    return existsProducts;
  },
});
