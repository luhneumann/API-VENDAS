import AppError from '@shared/errors/AppError';
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '@config/auth';

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function isAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT Token is missing.');
  }

  /*O Bearer token é formado por duas informações separadas por um espaço. Para fazermos a autorização precisamos conferir a segunda informação, que equivale ao token de autenticação. Pra isso fazemos o split para separar os dados e desestruturamos esse reader para retornar apenas o dado de interesse*/

  const [, token] = authHeader.split(' ');

  try {
    /*Esse método verifica se o token fornecido foi criado com a secret utilizada globalmente no projeto*/
    const decodedToken = verify(token, authConfig.jwt.secret);

    /* estrutura do decoded token ==>
    {
      iat:1607898813,
      exp:1607985213,
      sub: 'id_do_usuário_definido no_sessionsService'
    }

    Agora precisamos pegar esse "sub" e inserir nas requisições para que seja feita a verificação se esse usuário está com token válido para poder acessar a rota*/

    const { sub } = decodedToken as ITokenPayload;

    request.user = {
      id: sub,
    };

    return next();
  } catch {
    throw new AppError('Invalid JWT Token');
  }
}
