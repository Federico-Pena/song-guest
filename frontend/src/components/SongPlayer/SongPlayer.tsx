import './SongPlayer.css'
import { UseGameContext } from '../../context/GameContext.tsx'
import { YouTubePlayer } from './YouTubePlayer.tsx'
import { Categories } from './Categories.tsx'
import Attemps from './Attemps.tsx'

const SongPlayer = () => {
  const contextGame = UseGameContext()

  return (
    <div className="song-player">
      {contextGame.categorySelected && contextGame.state !== 'waiting' && (
        <YouTubePlayer />
      )}
      {!contextGame.categorySelected || contextGame.state === 'waiting' ? (
        <Categories />
      ) : (
        <Attemps />
      )}
    </div>
  )
}

export default SongPlayer
