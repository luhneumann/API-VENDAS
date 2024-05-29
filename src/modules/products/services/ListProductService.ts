import { ProductRepository } from '../typeorm/repositories/ProductsRepository';
import Product from '../typeorm/entities/product';

class ListProductService {
  public async execute(): Promise<Product[]> {
    const products = await ProductRepository.find();

    return products;
  }
}

export default ListProductService;
