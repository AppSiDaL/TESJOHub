import { type NextFunction, type Request, type Response } from 'express'
import { type CustonRequest } from '../types'
import PublitioAPI from 'publitio_js_sdk'

import multer from 'multer'
import { type PathOrFileDescriptor, readFileSync, unlinkSync } from 'fs'
const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const { User } = require('../models')
const jwt = require('jsonwebtoken')
const middleware = require('../middleware')
usersRouter.get(
  '/:id',
  middleware.userExtractor,
  async (request: CustonRequest, response: Response) => {
    const id = request.params.id
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (decodedToken.id === undefined) {
      return response.status(401).json({ error: 'token invalid' })
    }
    const user = await User.findById(id).populate('posts', {
      user: 0
    })
    response.json(user)
  }
)
usersRouter.get('/', async (_request: Request, response: Response) => {
  const users = await User.find({})

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
      firends: [],
      email,
      passwordHash,
      avatarUrl: null,
      coverUrl: null,
      post: []
    })
    const savedUser = await user.save()

    response.status(201).json(savedUser)
  } else {
    return response.status(400).json({
      error: 'User validation failed: username: Path `password` is required.'
    })
  }
})
const upload = multer({ dest: './uploads/' })

usersRouter.put(
  '/changeCover',
  middleware.userExtractor,
  upload.single('file'), // Añade multer middleware para manejar la carga del archivo
  async (request: CustonRequest, response: Response, _next: NextFunction) => {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (decodedToken.id === undefined) {
      return response.status(401).json({ error: 'token invalid' })
    }
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
    const user = {
      coverUrl: uploadResponse !== null ? uploadResponse.url_preview : null
    }
    const updatedUser = await User.findByIdAndUpdate(decodedToken.id, user, {
      new: true
    })
    response.json(updatedUser).end()
  }
)

usersRouter.put(
  '/changeProfile',
  middleware.userExtractor,
  upload.single('file'), // Añade multer middleware para manejar la carga del archivo
  async (request: CustonRequest, response: Response, _next: NextFunction) => {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (decodedToken.id === undefined) {
      return response.status(401).json({ error: 'token invalid' })
    }
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
    const user = {
      avatarUrl: uploadResponse !== null ? uploadResponse.url_preview : null
    }
    const updatedUser = await User.findByIdAndUpdate(decodedToken.id, user, {
      new: true
    })
    response.json(updatedUser).end()
  }
)

module.exports = usersRouter
