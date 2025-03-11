import './Countdown.css'
import { UseCountdownContext } from '../../context/CountdownContext.tsx'

const Countdown = () => {
  const { countdown } = UseCountdownContext()

  return (
    countdown !== null &&
    countdown !== 0 && (
      <div className={`countdown flex fullscreen}`}>
        <strong className={` ${countdown < 5 ? 'lessTime' : ''}`}>
          {countdown}
        </strong>
      </div>
    )
  )
}

export default Countdown
