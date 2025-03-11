import './Rooms.css'
import { useState } from 'react'
import { UseUserContext } from '../../context/UserContext.tsx'
import { GoogleIcon } from '../icons/Icons.tsx'
import { UseToastContext } from '../../context/ToastContext.tsx'
import { UseGameContext } from '../../context/GameContext.tsx'

const isValidMongoId = (value: string): boolean => {
  const mongoIdRegex = /^[0-9a-fA-F]{24}$/
  return mongoIdRegex.test(value)
}

const Rooms = () => {
  const contextGame = UseGameContext()
  const { user, login } = UseUserContext()
  const { addToast } = UseToastContext()
  const [roomInput, setRoomInput] = useState('')
  const [isValid, setIsValid] = useState(false)

  const handleRoomInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setRoomInput(value)
    setIsValid(isValidMongoId(value))
  }

  const handleJoinRoom = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (user === null) {
      addToast({
        text: 'You must be logged in to join a room',
        duration: 3000,
        className: 'toast-warning'
      })
      return
    }
    contextGame.joinRoom(roomInput)
  }

  const handleCreateRoom = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (user === null) {
      addToast({
        text: 'You must be logged in to create a room',
        duration: 3000,
        className: 'toast-warning'
      })
      return
    }
    contextGame.createRoom()
  }

  if (!user || user?.name === 'Guest') {
    return (
      <section className="rooms">
        <h2>
          Login to join a room <span>👇</span>
        </h2>
        <button
          onClick={() => {
            login()
          }}
          className="loginBtn"
          type="button"
          title="Login"
        >
          <span>Login</span> <GoogleIcon />
        </button>
      </section>
    )
  }

  return (
    <section className="rooms">
      <form>
        <label htmlFor="roomInput">
          Room ID
          <input
            type="text"
            placeholder="67ca3f2c524f91726ac2e011"
            minLength={36}
            value={roomInput}
            onChange={handleRoomInputChange}
          />
        </label>

        <button
          disabled={!isValid}
          onClick={handleJoinRoom}
          className="joinBtn"
          type="button"
        >
          Join
        </button>
        <button type="button" className="createBtn" onClick={handleCreateRoom}>
          New
        </button>
      </form>
    </section>
  )
}

export default Rooms
