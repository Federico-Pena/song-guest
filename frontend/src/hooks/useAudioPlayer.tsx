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
  const { categorySelected, dispatch, state } = UseGameContext()
  const { user } = UseUserContext()
  const { addToast } = UseToastContext()
  const [attempts, setAttempts] = useState(0)
  const [player, setPlayer] = useState<YT.Player | null>(null)
  const [progress, setProgress] = useState<number>(0)

  useEffect(() => {
    const rendomIndex = Math.floor(
      Math.random() * ((categorySelected?.items?.length || 5) - 1)
    )
    const id = categorySelected?.items[rendomIndex]?.id
    if (!window.YT) {
      const script = document.createElement('script')
      script.src = 'https://www.youtube.com/iframe_api'
      document.body.appendChild(script)
    }
    window.onYouTubeIframeAPIReady = () => {
      if (iframeRef.current) {
        new window.YT.Player(iframeRef.current, {
          videoId: id,
          playerVars: { controls: 0 },
          events: {
            onReady: (event) => setPlayer(event.target),
            onError: () => handleVideoError()
          }
        })
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
        if (!id) return
        player?.cueVideoById(id)
        setAttempts((prev) => prev + 1)
      }, 3000)
    }
  }, [categorySelected, iframeRef, addToast, attempts, player])

  useEffect(() => {
    if (!player) return
    const updateProgress = () => {
      const currentTime = player.getCurrentTime()
      const percentage =
        ((currentTime - initialTime) /
          playIntervals[playIntervals.length - 1]) *
        100
      setProgress(percentage)
    }
    const interval = setInterval(updateProgress, 300)
    return () => clearInterval(interval)
  }, [player])

  const togglePlayPause = () => {
    if (!player) return
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
    dispatch({ type: 'TOGGLE_PLAY_PAUSE' })
    setTimeout(() => {
      if (player.getPlayerState() === 1) {
        dispatch({ type: 'TOGGLE_PLAY_PAUSE' })
        player.pauseVideo()
      }
    }, playTime * 1000)
  }

  return {
    state,
    togglePlayPause,
    playIntervals,
    initialTime,
    progress
  }
}
