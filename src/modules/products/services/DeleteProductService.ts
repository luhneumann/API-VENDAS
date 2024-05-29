import { ProductRepository } from '../typeorm/repositories/ProductsRepository';
import AppError from '@shared/errors/AppError';

interface IRequest {
  id: string;
}

class DeleteProductService {
  public async execute({ id }: IRequest): Promise<void> {
    const product = await ProductRepository.findOneBy({ id: id });

    if (!product) {
      throw new AppError('Product not found.');
    }

    await ProductRepository.remove(product);
  }
}

export default DeleteProductService;
