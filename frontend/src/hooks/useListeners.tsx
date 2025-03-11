import { useNavigate } from 'react-router-dom'
import { UseToastContext } from '../context/ToastContext.tsx'
import { UseUserContext } from '../context/UserContext.tsx'
import { showConsoleLogsEvents } from '../utils/showConsoleLogsEvents.ts'
import { UseCountdownContext } from '../context/CountdownContext.tsx'

export const useListeners = (dispatch: React.Dispatch<GameAction>) => {
  const { addToast } = UseToastContext()
  const navigate = useNavigate()
  const { user, updateIdGameUser, updateUser } = UseUserContext()
  const { handleCountdown } = UseCountdownContext()

  const listenCountdown = ({ time }: EventsMap['countdown']) => {
    showConsoleLogsEvents('listenCountdown', { time })
    handleCountdown(time)
  }

  const listenResetGame = ({ game }: EventsMap['resetGame']) => {
    showConsoleLogsEvents('resetGame', { game })
    updateUser({ ...user, ready: false, points: 0, attempt: 0 })
    dispatch({
      type: 'UPDATE_ROOM',
      payload: { game }
    })
  }

  const listenUpdateAttempt = ({
    user: u,
    game
  }: EventsMap['updateAttempt']) => {
    showConsoleLogsEvents('updateAttempt', { user: u, game })
    if (u.idGoogle === user.idGoogle) {
      updateUser({ ...u })
    }

    dispatch({
      type: 'UPDATE_ROOM',
      payload: { game }
    })
  }

  const listenRoomCreated = ({ game }: EventsMap['createRoom']) => {
    showConsoleLogsEvents('createRoom', game)
    if (user) {
      updateIdGameUser(game._id)
      dispatch({ type: 'CREATE_ROOM', payload: game })
      if (user.idGoogle !== 'guest') {
        navigate(`/multiplayer/${game._id}`, {
          viewTransition: true
        })
      }
      addToast({
        text: `Room created`,
        duration: 3000,
        className: 'toast-success'
      })
    }
  }

  const listenLeaveRoom = ({ game, user: u }: EventsMap['leaveRoom']) => {
    showConsoleLogsEvents('leaveRoom', { game, user: u })
    if (u.idGoogle === user.idGoogle) {
      updateUser({ ...u, ready: false, points: 0, attempt: 0 })
      dispatch({ type: 'LEAVE_ROOM', payload: user })
      addToast({
        text: `You left the room`,
        duration: 3000,
        className: 'toast-success'
      })
      if (u.idGoogle === 'guest') {
        navigate(`/single-player`, {
          viewTransition: true
        })
        return
      }
      navigate(`/multiplayer`, {
        viewTransition: true
      })
      return
    }
    dispatch({ type: 'UPDATE_ROOM', payload: { game } })
    addToast({
      text: `Bye ${u.name}`,
      duration: 3000,
      className: 'toast-info'
    })
  }

  const listenJoinRoom = ({ game, user: u }: EventsMap['joinRoom']) => {
    showConsoleLogsEvents('joinRoom', { game, user: u })

    dispatch({ type: 'JOIN_ROOM', payload: game })
    if (u.idGoogle === user.idGoogle) {
      updateIdGameUser(game._id)
    }
    navigate(`/multiplayer/${game._id}`, {
      viewTransition: true
    })
    addToast({
      text: `Welcome to ${u.name}`,
      duration: 3000,
      className: 'toast-info'
    })
  }

  const listenToggleReady = ({ user: u }: EventsMap['toggleReady']) => {
    showConsoleLogsEvents('toggleReady', { user: u })
    if (u.idGoogle === user.idGoogle) {
      updateUser(u)
    }
    addToast({
      text: `${u.name} is ${u.ready ? 'ready' : 'not ready'}`,
      duration: 3000,
      className: 'toast-info'
    })
    dispatch({ type: 'TOGGLE_USER_READY', payload: u })
  }

  const listenVoteCategory = ({ categories }: EventsMap['voteCategory']) => {
    showConsoleLogsEvents('voteCategory', { categories })
    dispatch({ type: 'SET_CATEGORIES', payload: categories })
  }

  const listenStartGame = ({ game }: EventsMap['startGame']) => {
    showConsoleLogsEvents('startGame', game)
    dispatch({ type: 'UPDATE_ROOM', payload: { game } })
  }
  const listenError = ({ error }: EventsMap['error']) => {
    showConsoleLogsEvents('error', { error })
    addToast({
      text: error,
      duration: 3000,
      className: 'toast-error'
    })
  }
  return {
    listenCountdown,
    listenResetGame,
    listenUpdateAttempt,
    listenError,
    listenRoomCreated,
    listenLeaveRoom,
    listenJoinRoom,
    listenToggleReady,
    listenVoteCategory,
    listenStartGame
  }
}
