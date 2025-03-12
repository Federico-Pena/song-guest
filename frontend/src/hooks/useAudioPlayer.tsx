/* import { useEffect, useState } from 'react'
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
 */
declare global {
  interface Window {
    onYouTubeIframeAPIReady?: () => void
    YT: {
      Player: new (
        container: HTMLElement,
        options?: YT.PlayerOptions
      ) => YT.Player
    }
  }
}

import { useEffect, useState } from 'react'
import { UseGameContext } from '../context/GameContext.tsx'
import { UseUserContext } from '../context/UserContext.tsx'
import { UseToastContext } from '../context/ToastContext.tsx'

const playIntervals = [1, 3, 6, 12, 20, 30]
const initialTime = 10

export const useAudioPlayer = (
  iframeRef: React.RefObject<HTMLIFrameElement | null>
) => {
  const { isPlaying, categorySelected, dispatch, state } = UseGameContext()
  const { user } = UseUserContext()
  const { addToast } = UseToastContext()
  const [attempts, setAttempts] = useState(0)
  const [player, setPlayer] = useState<YT.Player | null>(null)

  useEffect(() => {
    if (!window.YT) {
      const script = document.createElement('script')
      script.src = 'https://www.youtube.com/iframe_api'
      document.body.appendChild(script)
    }

    window.onYouTubeIframeAPIReady = () => {
      if (iframeRef.current) {
        const id = categorySelected?.items[0]?.id
        new window.YT.Player(iframeRef.current, {
          videoId: id,
          playerVars: { controls: 0 },
          events: {
            onReady: (event) => setPlayer(event.target)
          }
        })
      }
    }
  }, [categorySelected, iframeRef])

  const togglePlayPause = () => {
    if (!player) return

    if (player.getPlayerState() === 1) {
      player.pauseVideo()
    } else {
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
      player.seekTo(initialTime, true)
      player.playVideo()
      setTimeout(() => {
        if (player.getPlayerState() === 1) {
          dispatch({ type: 'TOGGLE_PLAY_PAUSE' })
          player.pauseVideo()
        }
      }, playTime * 1000)
    }
  }

  const handleVideoError = () => {
    if (attempts > 0) {
      addToast({
        text: `Can't get the video. Trying again ${attempts}/10`,
        duration: 3000,
        className: 'toast-error'
      })
    }
    if (attempts >= 10) {
      addToast({
        text: "Can't get the video. Reload and try again",
        duration: 3000,
        className: 'toast-error'
      })
      return
    }
    setTimeout(() => {
      setAttempts((prev) => prev + 1)
    }, 3000)
  }

  return {
    isPlaying,
    state,
    togglePlayPause,
    handleVideoError,
    playIntervals,
    initialTime,
    player
  }
}
