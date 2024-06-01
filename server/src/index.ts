import { type Request, type Response } from 'express'
const path = require('path')
const express = require('express')
require('express-async-errors')
const middleware = require('./middleware')
const app = express()
const cors = require('cors')
const { PORT } = require('./utils/config')
const { connectToDatabase } = require('./utils/db')
const piezasRouter = require('./controllers/piezas')
const herramientasRouter = require('./controllers/herramientas')
const ordenesRouter = require('./controllers/ordenes')
const movimientosRouter = require('./controllers/movimientos')
const loginRouter = require('./controllers/login')
const usuariosRouter = require('./controllers/users')

app.use(cors())
app.use(express.static('./dist'))
app.use(express.json())
app.use(middleware.addToken)
app.use(middleware.requestLogger)
app.use('/api/piezas', piezasRouter)
app.use('/api/herramientas', herramientasRouter)
app.use('/api/ordenes', ordenesRouter)
app.use('/api/movimientos', movimientosRouter)
app.use('/api/login', loginRouter)
app.use('/api/usuarios', usuariosRouter)

app.get('*', (req: Request, res: Response) => {
  res.sendFile((path.join(__dirname, 'dist', 'index.html') as string))
})

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

const start = async (): Promise<void> => {
  await connectToDatabase()
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

start().catch((error) => {
  console.error('Error starting the server:', error)
})