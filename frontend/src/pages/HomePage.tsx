import { Link } from 'react-router-dom'
import './HomePage.css'
import { useEffect, useState } from 'react'
import { UserGroupIcon, UserIcon } from '../components/icons/Icons.tsx'
import { API_CONFIG } from '../config/config.ts'

const URL_DEV = API_CONFIG.API_URL

console.log()

export const HomePage = () => {
  const [usersScore, setUsersScore] = useState<UserScore[]>([])

  useEffect(() => {
    const fetchUsersScore = async () => {
      const response = await fetch(`${URL_DEV}/user-score`)
      const data = await response.json()
      setUsersScore(data)
    }
    fetchUsersScore()
  }, [])
  return (
    <main className="container">
      <h2>Welcome to the Song Guessing Game!</h2>
      {usersScore.length > 0 ? (
        <section className="users-score">
          <h3>Better Scores</h3>
          <ul>
            {usersScore
              .sort((a, b) => b.points - a.points)
              .map((user) => (
                <li key={user.idGoogle}>
                  <img src={user.picture} alt={user.name} />
                  <span className="span-name">{user.name}</span>
                  <span className="span-points">{user.points}</span>
                </li>
              ))}
          </ul>
        </section>
      ) : (
        <section className="users-score-empty">
          <Link to="/single-player">
            <span>Single Player</span> <UserIcon />
          </Link>
          <Link to="/multiplayer">
            <span>Multiplayer</span> <UserGroupIcon />
          </Link>
        </section>
      )}
    </main>
  )
}
