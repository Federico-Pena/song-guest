import './AudioProgressBar.css'
import { useEffect, useRef, useState } from 'react'

interface AudioProgressBarProps {
  audioRef: React.RefObject<HTMLAudioElement>
  playIntervals: number[]
}

export const AudioProgressBar = ({
  audioRef,
  playIntervals
}: AudioProgressBarProps) => {
  const [progress, setProgress] = useState(0)
  const progressBarRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!audioRef || !audioRef.current) return
    const refAudio = audioRef.current
    const updateProgress = () => {
      if (refAudio) {
        const percentage =
          (refAudio.currentTime / playIntervals[playIntervals.length - 1]) * 100
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
  }, [audioRef, playIntervals])

  return (
    <div className="progress-container">
      <div className="progress-bar" ref={progressBarRef}>
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
