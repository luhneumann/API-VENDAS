import AppError from '@shared/errors/AppError';
import { CustomersRepository } from '../typeorm/repositories/CustomersRepository';
import Customer from '../typeorm/entities/Customer';

interface IRequest {
  id: string;
}

class ShowCustomerService {
  public async execute({ id }: IRequest): Promise<Customer> {
    const customer = await CustomersRepository.findById(id);

    if (!customer) {
      throw new AppError('Customer not found');
    }

    return customer;
  }
}

export default ShowCustomerService;
