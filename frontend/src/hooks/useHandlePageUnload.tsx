import { useEffect } from 'react'

const useHandlePageUnload = (onUnload: () => void) => {
  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      onUnload()
      event.preventDefault()
    }
    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [onUnload])
}
export default useHandlePageUnload
