import { type NextFunction, type Request, type Response } from 'express'
import { type CustonRequest } from '../types'
const likeRouter = require('express').Router()
const { Like } = require('../models')
const { User } = require('../models')
const { Post } = require('../models')
const jwt = require('jsonwebtoken')
const middleware = require('../middleware')

likeRouter.get('/', async (_request: Request, response: Response) => {
  const likes = await Like.find({})
    .populate('user', { posts: 0 })
    .populate('post', { likes: 0 })
  response.json(likes)
})

likeRouter.get(
  '/:id',
  async (request: Request, response: Response, _next: NextFunction) => {
    const like = await Like.findById(request.params.id)
    if (like !== null && like !== undefined) {
      response.json(like)
    } else {
      response.status(404).end()
    }
  }
)

likeRouter.delete(
  '/:id',
  middleware.userExtractor,
  async (request: CustonRequest, response: Response, _next: NextFunction) => {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (decodedToken.id !== undefined) {
      return response.status(401).json({ error: 'token invalid' })
    }
    const user = await User.findById(decodedToken.id)
    const like = await Like.findById(request.params.id)
    if (like.user.toString() === user.id.toString()) {
      await Like.findByIdAndRemove(request.params.id)
      response.status(204).end()
    }
    response
      .status(400)
      .json({ error: 'User does not have the privileges' })
      .end()
  }
)

likeRouter.put(
  '/:id',
  async (request: CustonRequest, response: Response, _next: NextFunction) => {
    const body = request.body

    const blog = {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes
    }
    const updatedLike = await Like.findByIdAndUpdate(request.params.id, blog, {
      new: true
    })
    response.json(updatedLike).end()
  }
)

likeRouter.post(
  '/',
  middleware.userExtractor,
  async (request: CustonRequest, response: Response, _next: NextFunction) => {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (decodedToken.id === undefined) {
      return response.status(401).json({ error: 'token invalid' })
    }
    const user = await User.findById(decodedToken.id)
    const post = await Post.findById(request.body.post)

    // Check if the user has already liked the post
    const existingLike = await Like.findOne({
      post: request.body.post,
      user: user._id
    })
    if (existingLike !== null && existingLike !== undefined) {
      return response
        .status(400)
        .json({ error: 'User has already liked this post' })
    }

    const like = new Like({
      post: post._id,
      user: user._id
    })
    const likeSaved = await like.save()

    post.likes = post.likes.concat(likeSaved._id)
    await post.save()

    response.status(201).json(likeSaved)
  }
)
module.exports = likeRouter
