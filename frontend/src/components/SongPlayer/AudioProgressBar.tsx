import './AudioProgressBar.css'
import { useEffect, useState } from 'react'

interface AudioProgressBarProps {
  audioRef: React.RefObject<HTMLAudioElement>
  playIntervals: number[]
  initialTime: number
}

export const AudioProgressBar = ({
  audioRef,
  playIntervals,
  initialTime
}: AudioProgressBarProps) => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (!audioRef || !audioRef.current) return
    const refAudio = audioRef.current
    const updateProgress = () => {
      if (refAudio) {
        const percentage =
          ((refAudio.currentTime - initialTime) /
            playIntervals[playIntervals.length - 1]) *
          100
        setProgress(percentage)
      }
    }

    if (refAudio) {
      refAudio.addEventListener('timeupdate', updateProgress)
    }

    return () => {
      if (refAudio) {
        refAudio.removeEventListener('timeupdate', updateProgress)
      }
    }
  }, [audioRef, playIntervals, initialTime])

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
