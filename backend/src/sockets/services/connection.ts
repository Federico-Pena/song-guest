import type { Server, Socket } from 'socket.io'
import { GameModel } from '../../models/models.js'
import type { EventNames, EventsMap, GameModelDB, Player } from '../../types.js'
import { EVENT_NAMES } from '../gameSocket.js'
import { Types } from 'mongoose'
import { cleanEmptyRooms, deleteUserFromDb } from '../utils/dbUtils.js'
import { catchErrorController } from '../utils/catchErrorController.js'

export const loginController = async (
  data: EventsMap['login'],
  socket: Socket
) => {
  try {
    const isDeleted = await deleteUserFromDb(data.user)
    socket.emit(EVENT_NAMES.login, { user: data.user })
  } catch (error) {
    catchErrorController('loginController', error)
  }
}

export const createRoomController = async (
  data: EventsMap['createRoom'],
  socket: Socket,
  io: Server
) => {
  try {
    await deleteUserFromDb(data.user)
    await cleanEmptyRooms()
    const user = data.user
    const categories = data.categories
    const activeRooms = await GameModel.countDocuments()
    if (activeRooms >= 4) throw new Error('Maximum number of rooms reached')

    const gameId = new Types.ObjectId().toString()
    user.idGame = gameId

    const newGame = new GameModel({
      _id: gameId,
      host: user.name,
      players: [user],
      state: 'waiting',
      categories
    })

    await newGame.save()
    socket.join(gameId)
    io.to(gameId).emit(EVENT_NAMES.createRoom, { game: newGame })
  } catch (error: any) {
    catchErrorController('createRoomController', error)
  }
}

export const leaveRoomController = async (
  data: EventsMap['leaveRoom'],
  socket: Socket,
  io: Server
) => {
  try {
    console.log('leaveRoomController', data.user)

    const deleted = await deleteUserFromDb(data.user)
    if (deleted) {
      const newGame = await GameModel.findById(data.user.idGame)
      if (newGame && newGame.host === data.user.name) {
        newGame.host = newGame.players[0]?.name ?? 'Host'
        await newGame.save()
      }
      io.to(data.user.idGame).emit(EVENT_NAMES.leaveRoom, {
        game: newGame,
        user: data.user
      })
      socket.leave(data.user.idGame)
    }
  } catch (error) {
    catchErrorController('leaveRoomController', error)
  }
}

export const joinRoomController = async (
  data: EventsMap['joinRoom'],
  socket: Socket,
  io: Server
) => {
  try {
    const game = await GameModel.findById(data.gameId)
    if (!game) return
    await deleteUserFromDb(data.user)
    if (game.state === 'finished' || game.state === 'in-progress') {
      socket.emit(EVENT_NAMES.error, {
        error: 'The game is started'
      })
      return
    }
    const newUser = {
      ...data.user
    }
    newUser.idGame = data.gameId
    game.players.push(newUser)
    const updatedRoom = await game.save()
    const id = `${updatedRoom._id}`

    socket.join(id)
    io.to(data.gameId).emit(EVENT_NAMES.joinRoom, {
      game: updatedRoom,
      user: newUser
    })
  } catch (error) {
    catchErrorController('joinRoomController', error)
  }
}
