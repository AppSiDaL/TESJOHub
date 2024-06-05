import { type Request, type Response } from 'express'
import { chatRooms } from './chatController'
const chatsRouter = require('express').Router()

chatsRouter.get('/', (_req: Request, res: Response) => {
  res.json(chatRooms)
})

module.exports = chatsRouter
