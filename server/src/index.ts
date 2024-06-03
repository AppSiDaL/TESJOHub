import mongoose from 'mongoose'

const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const config = require('./utils/config')
const { postRouter } = require('./controllers')
const { userRouter } = require('./controllers')
const { loginRouter } = require('./controllers')
const { commentRouter } = require('./controllers')
const { likesRouter } = require('./controllers')
const { friendsRouter } = require('./controllers')
const middleware = require('./middleware')

app.use(cors())
app.use(express.json({ limit: '50mb' }))
app.use(middleware.addToken)
app.use(middleware.requestLogger)

const start = async (): Promise<void> => {
  try {
    console.log('connecting to', config.MONGODB_URI, 'with', config.PORT, 'port')
    await mongoose.connect(config.MONGODB_URI as string)
    console.log('connected to MongoDB')

    app.listen(config.PORT, () => {
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
app.use('/api/friends', friendsRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

start().catch((error) => {
  console.error('Error starting the server:', error)
})
