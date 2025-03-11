import './MultiplayerPage.css'
import Rooms from '../components/Rooms/Rooms.tsx'

function MultiplayerPage() {
  return (
    <main className="container flex">
      <h2>Multiplayer Mode</h2>
      <p>Create a room or join one!</p>
      <Rooms />
    </main>
  )
}

export default MultiplayerPage
