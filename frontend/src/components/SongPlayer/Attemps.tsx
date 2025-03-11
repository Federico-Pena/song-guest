import './Attemps.css'
import { useState } from 'react'
import { UseUserContext } from '../../context/UserContext.tsx'
import SearchBar from './SearchBar.tsx'
import { UseGameContext } from '../../context/GameContext.tsx'

const Attemps = () => {
  const { state, winner } = UseGameContext()
  const { user } = UseUserContext()
  const [inputValues, setInputValues] = useState<string[]>(Array(6).fill(''))

  const handleInputChange = (index: number, value: string) => {
    const newValues = [...inputValues]
    newValues[index] = value
    setInputValues(newValues)
  }

  return (
    <article className="attemps">
      <ul className="ul-attemps">
        {inputValues.map((value, index) => (
          <li
            key={index}
            className={`${index < user.attempt ? 'pass' : ''} ${
              winner === user.name &&
              index === user.attempt - 1 &&
              state === 'finished'
                ? 'correct'
                : ''
            } ${
              state === 'in-progress' && index === user.attempt
                ? 'currentAttemp'
                : 'attempt'
            }`}
          >
            {state === 'in-progress' && user.attempt === index ? (
              <SearchBar
                query={inputValues[index]}
                handleInputChange={handleInputChange}
                index={index}
              />
            ) : (
              <p className="userAttemps">
                {value.trim().length > 0
                  ? value.trim()
                  : index < user.attempt
                  ? '-------'
                  : `Attempt ${index + 1}`}
              </p>
            )}
          </li>
        ))}
      </ul>
    </article>
  )
}

export default Attemps
