import 'dotenv/config'
import { AppError } from 'src/common/domain/errors/app-error'
import {z} from 'zod'


const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.coerce.number().default(3333), //Todos os valores dentro do .env são considerados strings. Para que essa validação como number não gere erro, adicionamos o coerce e analisa a string e verifica se o valor dentro da string é numérico ou não.
  API_URL: z.string().default('http://localhost:3333')
})

const _env = envSchema.safeParse(process.env)
if (_env.success === false){
  throw new AppError('Invalid enviroment variables')
}

export const env = _env.data
