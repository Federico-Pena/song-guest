import { useEffect } from 'react'
import { socket } from '../socket/socket.ts'

type EventHandlers = {
  [K in keyof EventsMap]?: (data: EventsMap[K]) => void
}

export const useSocketListeners = (eventHandlers: EventHandlers) => {
  useEffect(() => {
    Object.entries(eventHandlers).forEach(([event, handler]) => {
      if (handler) {
        socket.on(event, handler)
      }
    })
    return () => {
      Object.entries(eventHandlers).forEach(([event, handler]) => {
        if (handler) {
          socket.off(event, handler)
        }
      })
    }
  }, [eventHandlers])
}
