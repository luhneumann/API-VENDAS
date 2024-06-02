import User from '../typeorm/entities/user';
import { UsersRepository } from '../typeorm/repositories/UsersRepository';

class ListUserService {
  public async execute(): Promise<User[]> {
    const users = UsersRepository.find();

    return users;
  }
}

export default ListUserService;
