import Customer from '../typeorm/entities/Customer';
import { CustomersRepository } from '../typeorm/repositories/CustomersRepository';

class ListCustomerService {
  public async execute(): Promise<Customer[]> {
    const customers = await CustomersRepository.find();

    return customers;
  }
}

export default ListCustomerService;
