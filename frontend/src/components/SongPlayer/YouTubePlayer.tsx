import './YouTubePlayer.css'
import { useRef } from 'react'
import { AudioProgressBar } from './AudioProgressBar.tsx'
import { MusicIcon, PlayIcon } from '../icons/Icons.tsx'
import { Loader } from '../Loader/Loader.tsx'
import { UseGameContext } from '../../context/GameContext.tsx'
import { useAudioPlayer } from '../../hooks/useAudioPlayer.tsx'

export const YouTubePlayer = () => {
  const iframeRef = useRef<HTMLIFrameElement | null>(null)
  const { isPlaying, state } = UseGameContext()
  const { togglePlayPause, progress, playIntervals, id } =
    useAudioPlayer(iframeRef)

  return (
    <article className="youtube-player">
      {state === 'in-progress' && (
        <>
          <AudioProgressBar progress={progress} playIntervals={playIntervals} />
          <button
            type="button"
            title={`${isPlaying ? 'Pause' : 'Play'}`}
            onClick={togglePlayPause}
            className={`btn-play-pause ${isPlaying ? 'playing' : ''}`}
          >
            {!id ? <Loader /> : isPlaying ? <MusicIcon /> : <PlayIcon />}
          </button>
        </>
      )}
      {state === 'in-progress' && (
        <iframe
          className="youtube-iframe"
          ref={iframeRef}
          src={`https://www.youtube.com/embed/${id}?enablejsapi=1&playsinline=1&controls=0&autoplay=1&mute=1&start=0&end=1`}
          allow="autoplay"
        ></iframe>
      )}
    </article>
  )
}
