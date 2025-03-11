import './YouTubePlayer.css'
import React, { useRef } from 'react'
import { AudioProgressBar } from './AudioProgressBar.tsx'
import { MusicIcon, PlayIcon } from '../icons/Icons.tsx'
import { useAudioPlayer } from '../../hooks/useAudioPlayer.tsx'
import { Loader } from '../Loader/Loader.tsx'

export const YouTubePlayer = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const {
    isPlaying,
    state,
    togglePlayPause,
    handleAudioError,
    playIntervals,
    initialTime
  } = useAudioPlayer(audioRef)
  return (
    <article className="youtube-player">
      {state === 'in-progress' && (
        <>
          <AudioProgressBar
            initialTime={initialTime}
            audioRef={audioRef as React.RefObject<HTMLAudioElement>}
            playIntervals={playIntervals}
          />
          <button
            type="button"
            title={`${isPlaying ? 'Pause' : 'Play'}`}
            onClick={togglePlayPause}
            className={`btn-play-pause ${isPlaying ? 'playing' : ''}`}
          >
            {!audioRef.current?.currentSrc ? (
              <Loader />
            ) : isPlaying ? (
              <MusicIcon />
            ) : (
              <PlayIcon />
            )}
          </button>
        </>
      )}
      <audio
        onError={handleAudioError}
        ref={audioRef}
        controls={state === 'finished'}
        className="audio-player"
      >
        <source type="audio/mp3" />
        Tu navegador no soporta el elemento de audio.
      </audio>
    </article>
  )
}
