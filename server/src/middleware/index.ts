import { type NextFunction, type Request, type Response } from 'express'
import { type CustomError, type CustonRequest } from '../types'

const jwt = require('jsonwebtoken')

const requestLogger = (
  request: Request,
  _response: Response,
  next: NextFunction
): void => {
  console.info('---')
  console.info('\x1b[36m%s\x1b[0m', 'Method:', request.method) // Cyan
  console.info('\x1b[32m%s\x1b[0m', 'Path:  ', request.path) // Green
  console.info('\x1b[33m%s\x1b[0m', 'Body:  ', request.body) // Yellow
  console.info('---')
  next()
}

const unknownEndpoint = (_request: Request, response: Response): void => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const addToken = (
  request: CustonRequest,
  _response: Response,
  next: NextFunction
): CustonRequest | null => {
  const authorization = request.get('Authorization')?.trimStart()
  if (authorization !== null && typeof authorization === 'string' && authorization.startsWith('Bearer')) {
    const token = authorization.replace('Bearer', '').trimStart()
    console.log(token)
    request.token = token
    next()
    return request
  }
  next()
  return null
}

const userExtractor = (
  request: CustonRequest,
  _response: Response,
  next: NextFunction
): CustonRequest => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  request.user = decodedToken.username
  next()
  return request
}

const errorHandler = (
  error: CustomError,
  _request: Request,
  response: Response,
  next: NextFunction
): Response | undefined => {
  console.info(error)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({ error: error.message })
  } else if (error.name === 'TokenExpiredError') {
    return response.status(401).json({
      error: 'token expired'
    })
  }

  next(error)
}

module.exports = {
  userExtractor,
  requestLogger,
  addToken,
  unknownEndpoint,
  errorHandler
}
