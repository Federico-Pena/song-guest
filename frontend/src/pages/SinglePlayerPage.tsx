import './SinglePlayerPage.css'
import { Player } from '../components/Rooms/Player.tsx'
import SongPlayer from '../components/SongPlayer/SongPlayer.tsx'
import { UseGameContext } from '../context/GameContext.tsx'
import { LeaveIcon } from '../components/icons/Icons.tsx'

function SinglePlayerPage() {
  const {
    createRoom,
    _id,
    players,
    startGame,
    state,
    resetGame,
    videoTitle,
    categorySelected,
    leaveRoom
  } = UseGameContext()

  const handleStart = () => {
    const everyReady = players.every((player) => player.ready)
    if (everyReady) {
      startGame()
    }
  }
  const handleReStart = () => {
    resetGame()
  }
  const handleLeaveRoom = () => {
    leaveRoom()
  }
  return (
    <main className="container">
      <h2>Single Player Mode</h2>
      <p>
        Guess the song within the given time limit! More features to come...
      </p>
      {!_id && (
        <button
          className="btn-start-single"
          title="Join Room"
          type="button"
          onClick={createRoom}
        >
          Start
        </button>
      )}
      {_id && (
        <div className="room">
          <span className="btn-leave-room" onClick={handleLeaveRoom}>
            Leave Room <LeaveIcon />
          </span>
          <div className="playersContainer">
            <Player />
          </div>
          {
            state === 'finished' && (
              <article className="songWinner">
                <p>{videoTitle}</p>
                <iframe
                  src={`https://www.youtube.com/embed/${categorySelected?.items[0]?.id}?autoplay=1`}
                  title={`${categorySelected?.items[0]?.title}`}
                  allow="autoplay"
                ></iframe>
              </article>
            )
            /* <article className="songWinner">
              <p>{videoTitle}</p>
              <img
                src={categorySelected?.items[0].thumbnail}
                alt={videoTitle ?? ''}
              />
            </article> */
          }
          {(state === 'waiting' || state === 'finished') && (
            <button
              className="btn-start-single"
              title="Join Room"
              type="button"
              disabled={players.some((player) => player.ready === false)}
              onClick={() =>
                state === 'waiting' ? handleStart() : handleReStart()
              }
            >
              {state === 'waiting' ? 'Start' : 'Restart'}
            </button>
          )}
          <SongPlayer />
        </div>
      )}
    </main>
  )
}

export default SinglePlayerPage
