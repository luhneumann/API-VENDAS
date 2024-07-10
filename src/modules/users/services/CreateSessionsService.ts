import AppError from '@shared/errors/AppError';
import { UsersRepository } from '../typeorm/repositories/UsersRepository';
import User from '../typeorm/entities/user';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth';

interface IUser {
  email: string;
  password: string;
}

interface IAuthorization {
  user: User;
  token: string;
}
class CreateSessionsService {
  public async execute({ email, password }: IUser): Promise<IAuthorization> {
    const user = await UsersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Incorrect email or password', 401);
    }
    const passwordConfirmed = await compare(password, user.password);

    if (!passwordConfirmed) {
      throw new AppError('Incorret email or password', 401);
    }
    /*a criação do token utiliza 3 parâmetros: payload, secret e informações a respeito do usuário e tempo de validade do token. No payload, não utilizar informações sensíveis. A secret pode ser configurada como variável de ambiente*/
    const token = sign({}, authConfig.jwt.secret, {
      subject: user.id,
      expiresIn: authConfig.jwt.expiresIn,
    });

    return {
      user,
      token,
    };
  }
}

export default CreateSessionsService;
