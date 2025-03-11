import { createContext, useContext, ReactNode, useReducer } from 'react'
import { UseUserContext } from './UserContext.tsx'
import { EVENTS_NAME_FRONT, socket } from '../socket/socket.ts'
import useHandlePageUnload from '../hooks/useHandlePageUnload.tsx'
import { gameReducer, initialStateGameContext } from './gameReducer.ts'
import { useSocketListeners } from '../hooks/useSocketListeners.tsx'
import { useListeners } from '../hooks/useListeners.tsx'

const GameContext = createContext<GameContextType>(initialStateGameContext)

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(gameReducer, initialStateGameContext)
  const { user } = UseUserContext()

  const {
    listenRoomCreated,
    listenLeaveRoom,
    listenJoinRoom,
    listenToggleReady,
    listenVoteCategory,
    listenStartGame,
    listenResetGame,
    listenError,
    listenUpdateAttempt,
    listenCountdown
  } = useListeners(dispatch)

  useSocketListeners({
    createRoom: listenRoomCreated,
    leaveRoom: listenLeaveRoom,
    joinRoom: listenJoinRoom,
    toggleReady: listenToggleReady,
    voteCategory: listenVoteCategory,
    startGame: listenStartGame,
    resetGame: listenResetGame,
    error: listenError,
    updateAttempt: listenUpdateAttempt,
    countdown: listenCountdown
  })

  useHandlePageUnload(() => {
    leaveRoom()
  })

  const createRoom = () => {
    socket.emit(EVENTS_NAME_FRONT.createRoom, {
      user,
      categories: state.categories
    })
  }
  const joinRoom = (gameId: string) => {
    socket.emit(EVENTS_NAME_FRONT.joinRoom, { gameId, user })
  }
  const updateplayerReady = () => {
    socket.emit(EVENTS_NAME_FRONT.toggleReady, { user })
  }
  const leaveRoom = () => {
    socket.emit(EVENTS_NAME_FRONT.leaveRoom, {
      user: user
    })
  }
  const voteCategory = (category: string) => {
    socket.emit(EVENTS_NAME_FRONT.voteCategory, {
      user,
      category
    })
  }
  const startGame = () => {
    socket.emit(EVENTS_NAME_FRONT.countdown, {
      time: 5,
      game: state
    })
    setTimeout(() => {
      socket.emit(EVENTS_NAME_FRONT.startGame, {
        user,
        state: 'in-progress'
      })
    }, 2000)
  }
  const updateAttempt = (text: string) => {
    socket.emit(EVENTS_NAME_FRONT.updateAttempt, {
      user,
      attempt: user.attempt + 1,
      text: text.trim()
    })
  }
  const resetGame = () => {
    socket.emit(EVENTS_NAME_FRONT.resetGame, {
      user,
      state
    })
  }
  return (
    <GameContext.Provider
      value={{
        ...state,
        updateAttempt,
        dispatch,
        createRoom,
        joinRoom,
        leaveRoom,
        updateplayerReady,
        voteCategory,
        startGame,
        resetGame
      }}
    >
      {children}
    </GameContext.Provider>
  )
}

export const UseGameContext = (): GameContextType => {
  const context = useContext(GameContext)
  if (!context) {
    throw new Error('UseGameContext must be used within a GameProvider')
  }
  return context
}
