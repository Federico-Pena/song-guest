import './SearchBar.css'
import { useEffect, useRef } from 'react'
import { UseLoader } from '../../context/LoaderContext.tsx'
import { useSearchSongs } from '../../hooks/useSearchSongs.tsx'
import { SendIcon } from '../icons/Icons.tsx'
import { Loader } from '../Loader/Loader.tsx'
import { UseGameContext } from '../../context/GameContext.tsx'
import { UseUserContext } from '../../context/UserContext.tsx'
import { UseToastContext } from '../../context/ToastContext.tsx'

const SearchBar = ({
  query,
  handleInputChange,
  index
}: {
  query: string
  handleInputChange: (index: number, value: string) => void
  index: number
}) => {
  const { results, cleanResults, setTheLastQuery } = useSearchSongs(query)
  const { isLoading } = UseLoader()
  const { updateAttempt, attempt, isPlaying } = UseGameContext()
  const { user } = UseUserContext()
  const { addToast } = UseToastContext()
  const listRef = useRef<HTMLUListElement>(null)
  const titleRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (listRef.current && !listRef.current.contains(event.target as Node)) {
        cleanResults()
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [cleanResults])

  const handleSendAnswer = async (
    e: React.MouseEvent<HTMLLIElement> | React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault()
    if (isPlaying) return
    const isListOption = e.currentTarget.classList.contains('search-result')
    let text = query

    if (isListOption) {
      text = e.currentTarget.children[1].textContent ?? ''
      setTheLastQuery(text)
      handleInputChange(index, text)
      cleanResults()
    }
    if (attempt !== user.attempt) {
      addToast({
        text: 'You have to wait for the other player',
        duration: 3000,
        className: 'toast-info'
      })
      return
    }

    updateAttempt(text)
  }
  return (
    <>
      <form className="form-search" onSubmit={handleSendAnswer}>
        <label htmlFor={`inputSongAnswer-${index}`} className="inputSongAnswer">
          <input
            type="text"
            id={`inputSongAnswer-${index}`}
            placeholder="Your answer"
            className="input-attemps"
            value={query}
            autoComplete="off"
            onChange={(e) => handleInputChange(index, e.target.value)}
          />
        </label>
        <button className="sendBtn" title="send" type="submit">
          {isLoading ? <Loader /> : <SendIcon />}
        </button>
      </form>

      <ul className="ul-results" ref={listRef}>
        {results.map((song) => (
          <li
            className="search-result"
            key={song.id}
            onClick={handleSendAnswer}
          >
            <img src={song.image} alt={song.title} />
            <span className="search-result-title" ref={titleRef}>
              {song.title}
            </span>
          </li>
        ))}
      </ul>
    </>
  )
}

export default SearchBar
