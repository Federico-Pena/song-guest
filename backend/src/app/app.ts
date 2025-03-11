import http from 'http'
import express from 'express'
import cors from 'cors'
import { Server } from 'socket.io'
import { apiConfig } from '../config/apiConfig.js'
import { errorHandler } from '../middlewares/errorHandler.js'
import gameRoutes from '../routes/gameRoutes.routes.js'
import { logger } from '../middlewares/logger.js'
import { connectDB } from '../db/database.js'
import { gameSocket } from '../sockets/gameSocket.js'
import path from 'path'

const app = express()
const server = http.createServer(app)
const io = new Server(server, {
  cors: apiConfig.CORS_SETTINGS
})
app.use(cors(apiConfig.CORS_SETTINGS))
app.disable('x-powered-by')
app.use(express.json())

app.use(express.static(path.join(process.cwd(), 'backend', 'build')))
app.use('/', gameRoutes)
app.use(logger(false))
app.use(errorHandler)
app.use('*', function (req, res) {
  res.sendFile(path.join(process.cwd(), 'backend', 'build', 'index.html'))
})
gameSocket(io)
connectDB().catch((err) => console.log(err))

export default server
