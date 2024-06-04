import { type NextFunction, type Response } from 'express'
import { type CustonRequest } from '../types'
const friendRouter = require('express').Router()
const { User } = require('../models')
const jwt = require('jsonwebtoken')
const middleware = require('../middleware')

friendRouter.delete(
  '/:id',
  middleware.userExtractor,
  async (request: CustonRequest, response: Response, _next: NextFunction) => {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (decodedToken.id !== undefined) {
      return response.status(401).json({ error: 'token invalid' })
    }
    const user = await User.findById(decodedToken.id)
    const like = await User.findById(request.params.id)
    if (like.user.toString() === user.id.toString()) {
      await User.findByIdAndRemove(request.params.id)
      response.status(204).end()
    }
    response
      .status(400)
      .json({ error: 'User does not have the privileges' })
      .end()
  }
)

friendRouter.put(
  '/:id',
  async (request: CustonRequest, response: Response, _next: NextFunction) => {
    const body = request.body

    const blog = {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes
    }
    const updatedLike = await User.findByIdAndUpdate(request.params.id, blog, {
      new: true
    })
    response.json(updatedLike).end()
  }
)

friendRouter.post(
  '/',
  middleware.userExtractor,
  async (request: CustonRequest, response: Response, _next: NextFunction) => {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (decodedToken.id === undefined) {
      return response.status(401).json({ error: 'token invalid' })
    }
    const usertoAddFollower = await User.findById(request.body.user)

    const existingFollower = usertoAddFollower.followers.find(
      (friend: string) => friend.toString() === decodedToken.id
    )
    console.log(existingFollower)
    if (existingFollower !== undefined) {
      return response
        .status(400)
        .json({ error: 'This user is already a friend' })
    }

    usertoAddFollower.followers = usertoAddFollower.followers.concat(
      decodedToken.id
    )
    const newFollower = await usertoAddFollower.save()

    response.status(201).json(newFollower)
  }
)
module.exports = friendRouter
