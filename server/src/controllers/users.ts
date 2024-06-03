import { type Request, type Response } from 'express'
import { type CustonRequest } from '../types'
const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const { User } = require('../models')
const jwt = require('jsonwebtoken')

usersRouter.get('/', async (request: CustonRequest, response: Response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (decodedToken.id === undefined) {
    return response.status(401).json({ error: 'token invalid' })
  }
  const user = await User.findById(decodedToken.id)
  response.json(user)
})
usersRouter.get('/all', async (_request: Request, response: Response) => {
  const users = await User
    .find({}).populate('posts', { user: 0 })

  response.json(users)
})

usersRouter.post('/', async (request: Request, response: Response) => {
  const { username, name, lastName, email, password } = request.body
  if (password !== undefined) {
    if (password.length < 3) {
      return response.status(400).json({ error: 'password too short' })
    }
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)
    const user = new User({
      username,
      name,
      lastName,
      email,
      passwordHash,
      avatarUrl: null,
      coverUrl: null,
      post: []
    })
    const savedUser = await user.save()

    response.status(201).json(savedUser)
  } else {
    return response.status(400).json({ error: 'User validation failed: username: Path `password` is required.' })
  }
})

module.exports = usersRouter
