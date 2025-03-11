import { createContext, useContext, useState, ReactNode } from 'react'

interface LoaderContextType {
  isLoading: boolean
  showLoader: () => void
  hideLoader: () => void
}

const LoaderContext = createContext<LoaderContextType | undefined>(undefined)

export const LoaderProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true)

  const showLoader = () => setIsLoading(true)
  const hideLoader = () => setIsLoading(false)

  return (
    <LoaderContext.Provider value={{ isLoading, showLoader, hideLoader }}>
      {children}
    </LoaderContext.Provider>
  )
}

export const UseLoader = () => {
  const context = useContext(LoaderContext)
  if (!context) {
    throw new Error('useLoader must be used within a LoaderProvider')
  }
  return context
}
