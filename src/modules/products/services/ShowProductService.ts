import { ProductRepository } from '../typeorm/repositories/ProductsRepository';
import Product from '../typeorm/entities/product';
import AppError from '@shared/errors/AppError';

interface IRequest {
  id: string;
}

class ShowProductService {
  public async execute({ id }: IRequest): Promise<Product | null> {
    const product = await ProductRepository.findOneBy({ id: id });

    if (!product) {
      throw new AppError('Product not found.');
    }
    return product;
  }
}

export default ShowProductService;
