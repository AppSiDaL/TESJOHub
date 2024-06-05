import { type NextFunction, type Request, type Response } from 'express'
import { type CustonRequest } from '../types'

import PublitioAPI from 'publitio_js_sdk'

import multer from 'multer'
import { type PathOrFileDescriptor, readFileSync, unlinkSync } from 'fs'
const postRouter = require('express').Router()
const { Post } = require('../models')
const { User } = require('../models')
const jwt = require('jsonwebtoken')
const middleware = require('../middleware')

postRouter.get('/', async (_request: CustonRequest, response: Response) => {
  const posts = await Post.find({})
    .populate('user', { posts: 0 })
    .populate({
      path: 'comments',
      populate: { path: 'user', select: '-posts' }
    })
    .populate({
      path: 'likes',
      populate: { path: 'user', select: '-posts' }
    })
  response.json(posts)
})

postRouter.get(
  '/userPosts',
  async (request: CustonRequest, response: Response) => {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (decodedToken.id === undefined) {
      return response.status(401).json({ error: 'token invalid' })
    }
    const user = await User.findById(decodedToken.id)
    const posts = await Post.find({ user: user._id })
      .populate('user', { posts: 0 })
      .populate({
        path: 'comments',
        populate: { path: 'user', select: '-posts' }
      })
      .populate({
        path: 'likes',
        populate: { path: 'user', select: '-posts' }
      })
    response.json(posts)
  }
)

postRouter.get(
  '/:id',
  async (request: Request, response: Response, _next: NextFunction) => {
    const blog = await Post.findById(request.params.id)
    if (blog !== null && blog !== undefined) {
      response.json(blog)
    } else {
      response.status(404).end()
    }
  }
)

postRouter.delete(
  '/:id',
  middleware.userExtractor,
  async (request: CustonRequest, response: Response, _next: NextFunction) => {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (decodedToken.id !== undefined) {
      return response.status(401).json({ error: 'token invalid' })
    }
    const user = await User.findById(decodedToken.id)
    const blog = await Post.findById(request.params.id)
    if (blog.user.toString() === user.id.toString()) {
      await Post.findByIdAndRemove(request.params.id)
      response.status(204).end()
    }
    response
      .status(400)
      .json({ error: 'User does not have the privileges' })
      .end()
  }
)

postRouter.put(
  '/:id',
  async (request: CustonRequest, response: Response, _next: NextFunction) => {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (decodedToken.id !== undefined) {
      return response.status(401).json({ error: 'token invalid' })
    }
    const body = request.body
    const blog = {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes
    }
    const updatedBlog = await Post.findByIdAndUpdate(request.params.id, blog, {
      new: true
    })
    response.json(updatedBlog).end()
  }
)

const upload = multer({ dest: './uploads/' })

postRouter.post(
  '/',
  middleware.userExtractor,
  upload.single('file'), // Añade multer middleware para manejar la carga del archivo
  async (request: CustonRequest, response: Response, _next: NextFunction) => {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (decodedToken.id === undefined) {
      return response.status(401).json({ error: 'token invalid' })
    }
    const user = await User.findById(decodedToken.id)
    const file = request.file
    let uploadResponse = null
    if (file !== undefined && file !== null) {
      const fileBuffer = readFileSync(file.path as PathOrFileDescriptor)
      const publitio = new PublitioAPI(
        '669h9nrnmMLBlDRmR66v',
        'inh3NVD6Wx3vjLTPVJAytHX6S4wj2RDa'
      )

      try {
        uploadResponse = await publitio.uploadFile(fileBuffer, 'file', {
          folder: 'mvMNDiMe'
        })
      } catch (error) {
        response.status(500).json({ error: error.message })
      } finally {
        // Borra el archivo del servidor
        unlinkSync(file.path)
      }
    }

    const data = JSON.parse(request.body.datos as string)
    const { time, postText } = data
    const post = new Post({
      user: user.id,
      time,
      postText,
      postImg: uploadResponse !== null ? uploadResponse.url_preview : null,
      likes: [],
      comments: []
    })
    const postSaved = await post.save()
    user.posts = user.posts.concat(postSaved._id)
    await user.save()
    response.status(201).json(postSaved)
  }
)

postRouter.get(
  '/userPosts/:id',
  async (request: CustonRequest, response: Response) => {
    const id = request.params.id
    const user = await User.findById(id)
    const posts = await Post.find({ user: user._id })
      .populate('user', { posts: 0 })
      .populate({
        path: 'comments',
        populate: { path: 'user', select: '-posts' }
      })
      .populate({
        path: 'likes',
        populate: { path: 'user', select: '-posts' }
      })
    response.json(posts)
  }
)
module.exports = postRouter
