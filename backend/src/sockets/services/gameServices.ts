import type { Server } from 'socket.io'
import { GameModel } from '../../models/models.js'
import type { GameModelDB } from '../../types.js'

export const countdown = async (
  contextGame: GameModelDB,
  time: number,
  isFullScreen: boolean,
  io: Server
) => {
  /*   try {
    if (!contextGame) return
    const game = await GameModel.findById(contextGame._id)
    if (!game) return
    const allReady = game.players.every((p) => p.ready)
    if (allReady) {
      let preparationInterval: NodeJS.Timer
      preparationInterval = setInterval(() => {
        console.log('preparationTime')
        io.to(contextGame._id).emit(EVENTS_NAMEOLD.emit.countdown, {
          time,
          isFullScreen
        })
        time--
        if (time < 0) {
          clearInterval(preparationInterval as any)
          io.to(contextGame._id).emit(EVENTS_NAMEOLD.emit.finishPreparationTime)
          console.log('finishPreparationTime')
        }
      }, 1000)
    }
  } catch (error: any) {
    console.error('Error countdown:', error.message)
    if (error.code === 11000) {
      const duplicateKey = Object.keys(error.keyValue)[0]
      console.error(`Error: Duplicado en el campo '${duplicateKey}'`)
    }
  } */
}
