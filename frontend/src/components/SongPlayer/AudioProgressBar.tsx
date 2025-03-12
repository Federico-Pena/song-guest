import './AudioProgressBar.css'
import { useEffect, useState } from 'react'

interface AudioProgressBarProps {
  player: YT.Player | null
  playIntervals: number[]
  initialTime: number
}

export const AudioProgressBar = ({
  player,
  playIntervals,
  initialTime
}: AudioProgressBarProps) => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (!player) return
    const updateProgress = () => {
      const currentTime = player.getCurrentTime()
      const percentage =
        ((currentTime - initialTime) /
          playIntervals[playIntervals.length - 1]) *
        100
      setProgress(percentage)
    }
    const interval = setInterval(updateProgress, 100)

    return () => clearInterval(interval)
  }, [player, playIntervals, initialTime])

  return (
    <div className="progress-container">
      <div className="progress-bar">
        <div className="progress" style={{ width: `${progress}%` }}></div>
        {playIntervals.map((time, index) => (
          <div
            key={index}
            className="tick"
            style={{
              left: `${(time / playIntervals[playIntervals.length - 1]) * 100}%`
            }}
          >
            <span className="tick-text">{(index + 1) * 10}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
