import './Categories.css'
import { UseGameContext } from '../../context/GameContext.tsx'

export const Categories = () => {
  const contextGame = UseGameContext()
  const makeClases = (category: Category) => {
    const totalPlayersInRoom = contextGame?.players.length ?? 0
    let text = ''
    const voteCount = category.players.length
    if (voteCount === totalPlayersInRoom) {
      text = 'top-category'
    } else if (voteCount >= totalPlayersInRoom / 2) {
      text = 'middle-category'
    } else {
      text = 'initial'
    }
    return text
  }

  const voteCategory = async (categoryName: string) => {
    contextGame.voteCategory(categoryName)
  }

  return (
    <header className="header-categories">
      <ul>
        {contextGame.categories.map((category) => {
          const { name, players } = category

          return (
            <li
              className={`playlist ${makeClases(category)}`}
              key={name}
              onClick={() => {
                voteCategory(name)
              }}
            >
              <span className="playlist-name">{name}</span>
              <span className="playlist-length">{players.length}</span>
            </li>
          )
        })}
      </ul>
    </header>
  )
}
