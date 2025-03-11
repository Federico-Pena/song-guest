import { useEffect } from 'react'
import { UseGameContext } from '../../context/GameContext.tsx'
import { UseUserContext } from '../../context/UserContext.tsx'
import SongPlayer from '../SongPlayer/SongPlayer.tsx'
import { HeaderRoom } from './HeaderRoom.tsx'
import { Player } from './Player.tsx'
import { useNavigate } from 'react-router-dom'

const Room = () => {
  const { user } = UseUserContext()
  const contextGame = UseGameContext()
  const { state, players, categorySelected, startGame, resetGame } = contextGame
  const navigate = useNavigate()

  useEffect(() => {
    if (players.length === 0) {
      navigate(`/multiplayer`, {
        viewTransition: true
      })
    }
  }, [players, navigate])

  const handleStart = () => {
    const everyReady = players.every((player) => player.ready)
    if (everyReady) {
      startGame()
    }
  }
  const handleReStart = () => {
    resetGame()
  }
  return (
    <div className="room">
      <HeaderRoom />
      <div className="playersContainer">
        <Player />
      </div>
      {state === 'finished' && (
        <article className="songWinner">
          <p>{contextGame.videoTitle}</p>
          <img
            src={contextGame.categorySelected?.items[0].thumbnail}
            alt={contextGame.videoTitle ?? ''}
          />
        </article>
      )}
      {contextGame.host === user?.name && state === 'finished' && (
        <p className={`btn-start`} title="Restart" onClick={handleReStart}>
          Restart
        </p>
      )}
      {(!categorySelected || state === 'waiting') &&
        contextGame.host === user?.name && (
          <button
            className={`btn-start ${state === 'waiting' ? 'disabled' : ''}`}
            title="Start"
            type="button"
            disabled={players.some((player) => player.ready === false)}
            onClick={handleStart}
          >
            Start
          </button>
        )}
      <SongPlayer />
    </div>
  )
}

export default Room
