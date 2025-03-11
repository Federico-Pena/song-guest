import './YouTubePlayer.css'
import { UseGameContext } from '../../context/GameContext.tsx'
import React, { useEffect, useRef } from 'react'
import { UseUserContext } from '../../context/UserContext.tsx'
import { AudioProgressBar } from './AudioProgressBar.tsx'
import { MusicIcon, PlayIcon } from '../icons/Icons.tsx'
import { UseToastContext } from '../../context/ToastContext.tsx'

export const YouTubePlayer = () => {
  const { isPlaying, categorySelected, dispatch, state } = UseGameContext()
  const { user } = UseUserContext()
  const { addToast } = UseToastContext()
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    if (!audioRef.current) return
    const audio = audioRef.current
    if (state === 'finished') {
      audio.currentTime = 0
      audio.play()
    }
  }, [state])

  const playIntervals = [1, 3, 6, 12, 20, 30]

  const togglePlayPause = async () => {
    try {
      if (!audioRef.current) return
      const audio = audioRef.current
      if (audio.paused) {
        dispatch({ type: 'TOGGLE_PLAY_PAUSE' })
        if (user?.attempt === playIntervals.length) {
          addToast({
            text: 'You have finished the game',
            duration: 3000,
            className: 'toast-success'
          })
          return
        }
        const playTime = playIntervals[user?.attempt]
        audio.currentTime = 0
        await audio.play()
        setTimeout(() => {
          if (audio.paused) return
          dispatch({ type: 'TOGGLE_PLAY_PAUSE' })
          audio.pause()
        }, playTime * 1000)
      }
    } catch (error: any) {
      addToast({
        text: 'Something went wrong',
        duration: 3000,
        className: 'toast-error'
      })
    }
  }

  const handleAudioError = () => {
    addToast({
      text: "Can't get the audio. Trying again...",
      duration: 3000,
      className: 'toast-error'
    })
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.load()
      }
    }, 3000)
  }
  const handleAudioLoad = () => {
    console.log('Audio loaded')
  }
  return (
    <article className="youtube-player">
      {state === 'in-progress' && (
        <>
          <AudioProgressBar
            audioRef={audioRef as React.RefObject<HTMLAudioElement>}
            playIntervals={playIntervals}
          />
          <button
            type="button"
            title={`${isPlaying ? 'Pause' : 'Play'}`}
            onClick={togglePlayPause}
            className={`btn-play-pause ${isPlaying ? 'playing' : ''}`}
          >
            {isPlaying ? <MusicIcon /> : <PlayIcon />}
          </button>
        </>
      )}
      <audio
        onError={handleAudioError}
        ref={audioRef}
        controls={state === 'finished'}
        className="audio-player"
      >
        <source
          onLoad={handleAudioLoad}
          src={`http://localhost:1234/play-audio/${categorySelected?.items[0]?.id}`}
          type="audio/mpeg"
        />
        Tu navegador no soporta el elemento de audio.
      </audio>
    </article>
  )
}
