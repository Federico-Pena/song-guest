import { useEffect } from 'react'
import Room from '../components/Rooms/Room.tsx'
import { useNavigate } from 'react-router-dom'
import { UseUserContext } from '../context/UserContext.tsx'

const RoomPage = () => {
  const { user } = UseUserContext()
  const navigate = useNavigate()

  useEffect(() => {
    if (user?.idGoogle === 'guest') {
      navigate('/multiplayer')
    }
  }, [navigate, user])
  return (
    <main>
      <Room />
    </main>
  )
}

export default RoomPage
