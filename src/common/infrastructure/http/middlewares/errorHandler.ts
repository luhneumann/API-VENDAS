import { NextFunction, Request, Response } from "express";
import { AppError } from "src/common/domain/errors/app-error";

export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction): Response {
  if(err instanceof AppError){
    return res.status(err.statusCode).json({status: 'error', message: err.message})
  }

  console.error(err)

  return res.status(500).json({status:'error', message: 'Internal Server Error'})
}

