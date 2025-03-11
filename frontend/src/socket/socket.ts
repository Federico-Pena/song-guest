import { io } from 'socket.io-client'

const URL =
  process.env.NODE_ENV === 'production' ? '/' : 'http://localhost:1234'

const socket = io(URL)

const EVENTS_NAME_FRONT: EventNamesConst = {
  login: 'login',
  createRoom: 'createRoom',
  joinRoom: 'joinRoom',
  leaveRoom: 'leaveRoom',
  toggleReady: 'toggleReady',
  voteCategory: 'voteCategory',
  startGame: 'startGame',
  resetGame: 'resetGame',
  error: 'error',
  updateAttempt: 'updateAttempt',
  countdown: 'countdown'
}

export { socket, EVENTS_NAME_FRONT }
