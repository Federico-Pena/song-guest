import React, { createContext, useContext, useState } from 'react'
import Toastify from 'toastify-js'

interface ToastContextProps {
  addToast: (options?: OptionsToast) => void
}

type OptionsToast = {
  text: string
  duration: number
  className?: 'toast-error' | 'toast-info' | 'toast-success' | 'toast-warning'
  destination?: string
  newWindow?: boolean
  close?: boolean
  gravity?: 'top' | 'bottom'
  position?: 'left' | 'center' | 'right'
  stopOnFocus?: boolean
  onClick?: () => void
}

const initialState: ToastContextProps = {
  addToast: () => {}
}

const ToastContext = createContext<ToastContextProps>(initialState)

const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [lastMessage, setLastMessage] = useState<string | null>(null)

  const addToast = (options?: OptionsToast) => {
    if (!options || options.text === lastMessage) return

    setLastMessage(options.text)
    Toastify(options).showToast()

    setTimeout(() => setLastMessage(null), 1000)
  }

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
    </ToastContext.Provider>
  )
}

const UseToastContext = () => {
  const context = useContext(ToastContext)
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
}

export { ToastContext, ToastProvider, UseToastContext }
