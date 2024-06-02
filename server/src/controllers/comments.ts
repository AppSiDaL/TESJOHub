import { type NextFunction, type Request, type Response } from 'express'
import { type CustonRequest } from '../types'
const commentRouter = require('express').Router()
const { Comment } = require('../models')
const { User } = require('../models')
const { Post } = require('../models')
const jwt = require('jsonwebtoken')
const middleware = require('../middleware')

commentRouter.get('/', async (_request: Request, response: Response) => {
  const notes = await Comment.find({}).populate('user', { posts: 0 })
  response.json(notes)
})

commentRouter.get(
  '/:id',
  async (request: Request, response: Response, _next: NextFunction) => {
    const comment = await Comment.findById(request.params.id)
    if (comment !== null && comment !== undefined) {
      response.json(comment)
    } else {
      response.status(404).end()
    }
  }
)

commentRouter.delete(
  '/:id',
  middleware.userExtractor,
  async (request: CustonRequest, response: Response, _next: NextFunction) => {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (decodedToken.id !== undefined) {
      return response.status(401).json({ error: 'token invalid' })
    }
    const user = await User.findById(decodedToken.id)
    const comment = await Comment.findById(request.params.id)
    if (comment.user.toString() === user.id.toString()) {
      await Comment.findByIdAndRemove(request.params.id)
      response.status(204).end()
    }
    response
      .status(400)
      .json({ error: 'User does not have the privileges' })
      .end()
  }
)

commentRouter.put(
  '/:id',
  async (request: CustonRequest, response: Response, _next: NextFunction) => {
    const body = request.body

    const blog = {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes
    }
    const updatedComment = await Comment.findByIdAndUpdate(request.params.id, blog, {
      new: true
    })
    response.json(updatedComment).end()
  }
)

commentRouter.post(
  '/',
  middleware.userExtractor,
  async (request: CustonRequest, response: Response, _next: NextFunction) => {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (decodedToken.id === undefined) {
      return response.status(401).json({ error: 'token invalid' })
    }
    const user = await User.findById(decodedToken.id)
    const post = await Post.findById(request.body.post)
    const comment = new Comment({
      post: post._id,
      commentText: request.body.commentText,
      user: user._id
    })
    post.comments = post.comments.concat(comment._id)
    post.save()
    const commentSaved = await comment.save()
    response.status(201).json(commentSaved)
  }
)
module.exports = commentRouter
