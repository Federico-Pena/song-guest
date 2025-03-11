import { useGoogleLogin } from '@react-oauth/google'
import React, { createContext, useContext, useState } from 'react'
import { socket } from '../socket/socket.ts'
import { useSocketListeners } from '../hooks/useSocketListeners.tsx'
import { UseToastContext } from './ToastContext.tsx'

const initialState: {
  user: Player
  login: () => void
  logout: () => void
  updateIdGameUser: (idGame: string) => void
  updateUser: (user: Player) => void
  updateUserAttempt: (attempt: number) => void
} = {
  user: {
    idGame: 'idGame',
    ready: false,
    points: 0,
    name: 'Guest',
    picture: '/user.webp',
    idGoogle: 'guest',
    attempt: 0
  },
  login: () => {},
  logout: () => {},
  updateIdGameUser: () => {},
  updateUser: () => {},
  updateUserAttempt: () => {}
}

const UserContext = createContext(initialState)

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<Player>(initialState.user)
  const { addToast } = UseToastContext()
  const handleLogin = (data: EventsMap['login']) => {
    //  showConsoleLogsEvents('login', data)
    const user = data.user
    addToast({
      text: `Welcome ${user.name}`,
      duration: 3000,
      className: 'toast-info'
    })
    setUser(user)
  }

  useSocketListeners({
    login: handleLogin
  })
  const login = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      try {
        const urlUserInfo = 'https://www.googleapis.com/oauth2/v1/userinfo'
        const userInfo = await fetch(urlUserInfo, {
          headers: {
            Authorization: `Bearer ${codeResponse.access_token}`
          }
        })
        const { id, name, picture } = await userInfo.json()
        const userData = {
          idGoogle: id,
          name,
          picture,
          ready: false,
          points: 0,
          idGame: 'idGame',
          attempt: 0
        }

        setUser(userData)
        socket.emit('login', { user: userData })
      } catch (error) {
        setUser(initialState.user)
        console.error('Failed to get user information:', error)
      }
    }
  })

  const logout = () => {
    socket.emit('logout', { user })
    setUser(initialState.user)
  }
  const updateIdGameUser = (idGame: string) => {
    setUser({ ...user, idGame, points: 0, ready: false })
  }
  const updateUser = (user: Player) => {
    setUser({ ...user })
  }
  const updateUserAttempt = (attempt: number) => {
    setUser({ ...user, attempt })
  }
  return (
    <UserContext.Provider
      value={{
        updateUser,
        user,
        login,
        logout,
        updateIdGameUser,
        updateUserAttempt
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export const UseUserContext = () => {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('UseUserContext must be used within a UserProvider')
  }
  return context
}
