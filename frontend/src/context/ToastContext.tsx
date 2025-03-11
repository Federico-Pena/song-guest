import React, { createContext, useContext } from 'react'
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
  const addToast = (options?: OptionsToast) => {
    Toastify(options).showToast()
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
