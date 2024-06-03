import { type CustonRequest } from '../types'
import { type Response } from 'express'
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const { User } = require('../models')

loginRouter.post('/', async (request: CustonRequest, response: Response) => {
  const { username, password } = request.body

  const user = await User.findOne({ username })
  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(password, user.passwordHash)

  if (!(user !== undefined && passwordCorrect === true)) {
    return response.status(401).json({
      error: 'invalid username or password'
    })
  }

  const userForToken = {
    username: user.username,
    id: user._id
  }

  const expiresIn = 60 * 60 * 24 // 24 hours in seconds
  const expirationDate = new Date(Date.now() + expiresIn * 1000) // Convert to milliseconds

  const token = jwt.sign(
    userForToken,
    process.env.SECRET,
    { expiresIn }
  )

  response
    .status(200)
    .send({ token, userId: user.id, username: user.username, name: user.name, expiresIn: expirationDate.toISOString() })
})

module.exports = loginRouter

module.exports = loginRouter
