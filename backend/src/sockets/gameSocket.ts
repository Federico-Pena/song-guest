import { Server, Socket } from 'socket.io'

import type { EventNames, EventNamesConst, EventsMap } from '../types.js'
import {
  createRoomController,
  joinRoomController,
  leaveRoomController,
  loginController
} from './services/connection.js'
import {
  resetGameController,
  startGameController,
  togglePlayPauseController,
  toggleReadyController,
  updateAttemptController,
  voteCategoryController
} from './services/actions.js'

export const gameSocket = async (io: Server) => {
  try {
    io.on(EVENT_NAMES.connection, (socket: Socket) => {
      console.log(EVENT_NAMES.connection, socket.id)
      socket.on(EVENT_NAMES.disconnect, () => {
        console.log(EVENT_NAMES.disconnect, socket.id)
      })
      handleEvent(EVENT_NAMES.login, socket, io, loginController)
      handleEvent(EVENT_NAMES.createRoom, socket, io, createRoomController)
      handleEvent(EVENT_NAMES.leaveRoom, socket, io, leaveRoomController)
      handleEvent(EVENT_NAMES.joinRoom, socket, io, joinRoomController)
      handleEvent(EVENT_NAMES.toggleReady, socket, io, toggleReadyController)
      handleEvent(EVENT_NAMES.voteCategory, socket, io, voteCategoryController)
      handleEvent(EVENT_NAMES.startGame, socket, io, startGameController)
      handleEvent(EVENT_NAMES.resetGame, socket, io, resetGameController)
      handleEvent(
        EVENT_NAMES.updateAttempt,
        socket,
        io,
        updateAttemptController
      )
      handleEvent(
        EVENT_NAMES.togglePlayPause,
        socket,
        io,
        togglePlayPauseController
      )
    })
  } catch (error: any) {
    console.log(error)
  }
}

export const EVENT_NAMES: EventNamesConst = {
  connection: 'connection',
  disconnect: 'disconnect',
  login: 'login',
  createRoom: 'createRoom',
  leaveRoom: 'leaveRoom',
  joinRoom: 'joinRoom',
  toggleReady: 'toggleReady',
  voteCategory: 'voteCategory',
  startGame: 'startGame',
  resetGame: 'resetGame',
  togglePlayPause: 'togglePlayPause',
  updateAttempt: 'updateAttempt',
  error: 'error'
} as const

const handleEvent = (
  event: EventNames,
  socket: Socket,
  io: Server,
  controller: (data: EventsMap[EventNames], socket: Socket, io: Server) => void
) => {
  socket.on(event, (data: EventsMap[EventNames]) => {
    console.log('------------------------------------------------------')
    console.log(`🎯 Socket Event Received: ${event}`)
    console.log('📦 Data: ', data)
    console.log('------------------------------------------------------')
    controller(data as EventsMap[EventNames], socket, io)
  })
}
