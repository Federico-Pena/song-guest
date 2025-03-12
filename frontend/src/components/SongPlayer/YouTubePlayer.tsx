import './YouTubePlayer.css'
import { useRef } from 'react'
import { AudioProgressBar } from './AudioProgressBar.tsx'
import { MusicIcon, PlayIcon } from '../icons/Icons.tsx'
import { Loader } from '../Loader/Loader.tsx'
import { UseGameContext } from '../../context/GameContext.tsx'
import { useAudioPlayer } from '../../hooks/useAudioPlayer.tsx'

export const YouTubePlayer = () => {
  const iframeRef = useRef<HTMLIFrameElement | null>(null)
  const { isPlaying, categorySelected, state } = UseGameContext()
  const { togglePlayPause, progress, playIntervals } = useAudioPlayer(iframeRef)

  const videoId = categorySelected?.items[0]?.id

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
            {!videoId ? <Loader /> : isPlaying ? <MusicIcon /> : <PlayIcon />}
          </button>
        </>
      )}
      {state === 'in-progress' && (
        <iframe
          className="youtube-iframe"
          ref={iframeRef}
          src={`https://www.youtube.com/embed/${videoId}?enablejsapi=1&playsinline=1&controls=0`}
        ></iframe>
      )}
    </article>
  )
}
