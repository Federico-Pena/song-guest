import './Countdown.css'
import { useEffect } from 'react'
import { socket } from '../../socket/socket.ts'
import { UseCountdownContext } from '../../context/CountdownContext.tsx'

const Countdown = () => {
  const { countdown, handleCountdown, isFullScreen, handleIsFullScreen } =
    UseCountdownContext()
  useEffect(() => {
    const countdownHandler = ({
      time,
      isFullScreen
    }: {
      time: number
      isFullScreen: boolean
    }) => {
      handleCountdown(time)
      if (isFullScreen) {
        handleIsFullScreen(true)
      } else {
        handleIsFullScreen(false)
      }
    }

    const handleFinishTime = () => {
      handleIsFullScreen(false)
    }

    socket.on('countdown', countdownHandler)
    socket.on('finishTime', handleFinishTime)

    return () => {
      socket.off('countdown', countdownHandler)
      socket.off('finishTime', handleFinishTime)
    }
  }, [handleCountdown, handleIsFullScreen])

  return (
    countdown !== null &&
    countdown !== 0 && (
      <div className={`countdown flex ${isFullScreen ? 'fullscreen' : ''}`}>
        <strong className={` ${countdown < 5 ? 'lessTime' : ''}`}>
          {countdown}
        </strong>
      </div>
    )
  )
}

export default Countdown
