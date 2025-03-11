import React, { createContext, useContext, useState } from 'react'
import Countdown from '../components/Countdown/Countdown.tsx'

const initialState: CountdownContextType = {
  countdown: 0,
  isFullScreen: false,
  handleCountdown: () => {},
  handleIsFullScreen: () => {}
}

const CountdownContext = createContext<CountdownContextType | undefined>(
  initialState
)

export const CountdownProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [countdown, setCountdown] = useState<number>(initialState.countdown)
  const [isFullScreen, setIsFullScreen] = useState<boolean>(
    initialState.isFullScreen
  )

  const handleCountdown = (time: React.SetStateAction<number>) => {
    setCountdown(time)
  }
  const handleIsFullScreen = (isFullScreen: React.SetStateAction<boolean>) => {
    setIsFullScreen(isFullScreen)
  }

  return (
    <CountdownContext.Provider
      value={{ countdown, isFullScreen, handleCountdown, handleIsFullScreen }}
    >
      <Countdown />
      {children}
    </CountdownContext.Provider>
  )
}

export const UseCountdownContext = (): CountdownContextType => {
  const context = useContext(CountdownContext)
  if (!context) {
    throw new Error(
      'useCountdownContext must be used within a CountdownProvider'
    )
  }
  return context
}
