import './Player.css'
import { UseGameContext } from '../../context/GameContext.tsx'
import { UseUserContext } from '../../context/UserContext.tsx'
import { useEffect } from 'react'

export const Player = () => {
  const { players, updateplayerReady, state, winner } = UseGameContext()
  const { user } = UseUserContext()
  useEffect(() => {
    if (winner !== null) {
      scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }
  }, [winner])

  const playerReady = (playerIdGoogle: string) => {
    if (playerIdGoogle === user?.idGoogle) {
      updateplayerReady()
    }
  }
  return players.length > 0
    ? players
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((player) => {
          return (
            <article
              className={`player ${
                state === 'finished' && winner === player.name ? 'winner' : ''
              } ${
                state === 'in-progress' || state === 'finished'
                  ? 'in-progress'
                  : ''
              }`}
              key={player.idGoogle}
            >
              <ul className="ul-player">
                {winner === player.name && (
                  <li className="li-winner">Winner</li>
                )}
                <li className="player-user-picture flex">
                  <img
                    src={player.picture}
                    alt="user"
                    className="user-icon"
                    onError={(e) => {
                      e.currentTarget.src = '/user.webp'
                      e.currentTarget.classList.add('user-icon-error')
                    }}
                  />
                </li>
                {state === 'waiting' && (
                  <li className="player-user-name flex">
                    <p>{player.name}</p>
                  </li>
                )}
                {state === 'waiting' ? (
                  <li
                    onClick={() => {
                      if (state === 'waiting') {
                        playerReady(player.idGoogle)
                      }
                    }}
                    className={`ready flex ${
                      player.ready ? 'player-ready' : 'player-not-ready'
                    }`}
                  >
                    {player.ready ? 'Ready' : 'Not Ready'}
                  </li>
                ) : (
                  <li className="playerPoints">
                    <span>Attempt</span>
                    <span>{player.attempt}</span>
                  </li>
                )}
              </ul>
            </article>
          )
        })
    : null
}
