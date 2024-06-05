import mongoose from 'mongoose'
import { Server } from 'socket.io'
import chatController from './controllers/chatController'

const express = require('express')
require('express-async-errors')
const app = express()
const http = require('http')
const cors = require('cors')

const config = require('./utils/config')
const { postRouter } = require('./controllers')
const { userRouter } = require('./controllers')
const { loginRouter } = require('./controllers')
const { commentRouter } = require('./controllers')
const { likesRouter } = require('./controllers')
const { followersRouter } = require('./controllers')
const { chatsRouter } = require('./controllers')

const middleware = require('./middleware')
const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: '*'
  }
})

chatController(io)

app.use(cors())
app.use(express.json({ limit: '50mb' }))
app.use(middleware.addToken)
app.use(middleware.requestLogger)

const start = async (): Promise<void> => {
  try {
    console.log('connecting to', config.MONGODB_URI, 'with', config.PORT, 'port')
    await mongoose.connect(config.MONGODB_URI as string)
    console.log('connected to MongoDB')

    server.listen(config.PORT, () => {
      console.log(`Server running on port ${config.PORT}`)
    })
  } catch (error) {
    console.error('Error connecting to MongoDB or starting the server:', error)
  }
}

app.use('/api/posts', postRouter)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)
app.use('/api/comments', commentRouter)
app.use('/api/likes', likesRouter)
app.use('/api/followers', followersRouter)
app.use('/api/chats', chatsRouter)

app.use(express.urlencoded({ extended: true }))
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

start().catch((error) => {
  console.error('Error starting the server:', error)
})
