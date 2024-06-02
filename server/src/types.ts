import { type ErrorRequestHandler, type Request } from 'express'

export interface CustonRequest extends Request {
  datos?: any
  token?: string
  user?: string
}
export interface CustomError extends ErrorRequestHandler {
  message?: string
}
