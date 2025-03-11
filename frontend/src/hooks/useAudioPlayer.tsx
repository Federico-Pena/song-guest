import { useEffect, useState } from 'react'
import { UseGameContext } from '../context/GameContext.tsx'
import { UseUserContext } from '../context/UserContext.tsx'
import { UseToastContext } from '../context/ToastContext.tsx'
import { getAudio } from '../services/getAudio.ts'

const playIntervals = [1, 3, 6, 12, 20, 30]
const initialTime = 10

export const useAudioPlayer = (
  audioRef: React.RefObject<HTMLAudioElement | null>
) => {
  const { isPlaying, categorySelected, dispatch, state } = UseGameContext()
  const { user } = UseUserContext()
  const { addToast } = UseToastContext()
  const [attemps, setAttemps] = useState(0)

  useEffect(() => {
    if (!audioRef.current) return
    if (state === 'finished') {
      audioRef.current.currentTime = 0
      audioRef.current.play()
    }
  }, [state, audioRef])

  useEffect(() => {
    try {
      if (audioRef.current?.currentSrc) return
      getAudio(categorySelected?.items[0]?.id)
        .then((res) => {
          if (res && audioRef.current) {
            audioRef.current.setAttribute('src', res)
          }
        })
        .catch(console.error)
    } catch (error) {
      console.log(error)
    }
  }, [categorySelected, audioRef])

  const togglePlayPause = async () => {
    try {
      if (!audioRef.current) return
      if (!audioRef.current?.currentSrc) return
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
        audio.currentTime = initialTime
        await audio.play()
        setTimeout(() => {
          if (!audio.paused) {
            dispatch({ type: 'TOGGLE_PLAY_PAUSE' })
            audio.pause()
          }
        }, playTime * 1000)
      }
    } catch (error: unknown) {
      if (error) {
        addToast({
          text: 'Something went wrong',
          duration: 3000,
          className: 'toast-error'
        })
      }
    }
  }

  const handleAudioError = () => {
    if (attemps > 0) {
      addToast({
        text: `Can't get the audio. Trying again ${attemps}/10`,
        duration: 3000,
        className: 'toast-error'
      })
    }
    if (attemps >= 10) {
      addToast({
        text: 'Cant get the audio. Reload and try again',
        duration: 3000,
        className: 'toast-error'
      })
      return
    }
    setTimeout(() => {
      if (audioRef.current) {
        setAttemps(attemps + 1)
        audioRef.current.load()
      }
    }, 3000)
  }

  return {
    isPlaying,
    state,
    togglePlayPause,
    handleAudioError,
    playIntervals,
    initialTime
  }
}
