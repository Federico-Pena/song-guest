import './YouTubePlayer.css'
import React, { useRef } from 'react'
import { AudioProgressBar } from './AudioProgressBar.tsx'
import { MusicIcon, PlayIcon } from '../icons/Icons.tsx'
import { Loader } from '../Loader/Loader.tsx'
import { UseGameContext } from '../../context/GameContext.tsx'
import { useAudioPlayer } from '../../hooks/useAudioPlayer.tsx'

export const YouTubePlayer = () => {
  const iframeRef = useRef<HTMLIFrameElement | null>(null)
  const { isPlaying, categorySelected, state } = UseGameContext()
  const { togglePlayPause, player, initialTime, playIntervals } =
    useAudioPlayer(iframeRef)

  const videoId = `https://www.youtube.com/watch?v=${categorySelected?.items[0]?.id}`

  return (
    <article className="youtube-player">
      {state === 'in-progress' && (
        <>
          <AudioProgressBar
            initialTime={initialTime}
            player={player}
            playIntervals={playIntervals}
          />
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
      <iframe
        className="youtube-iframe"
        ref={iframeRef}
        src={`https://www.youtube.com/embed/${categorySelected?.items[0]?.id}?enablejsapi=1`}
        title={`${categorySelected?.items[0]?.title}`}
      ></iframe>
      {/*  <audio
        onError={handleAudioError}
        ref={audioRef}
        controls={state === 'finished'}
        className="audio-player"
      >
        <source type="audio/mpeg" />
        Tu navegador no soporta el elemento de audio.
      </audio> */}
    </article>
  )
}
