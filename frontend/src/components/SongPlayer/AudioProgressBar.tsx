import './AudioProgressBar.css'

interface AudioProgressBarProps {
  progress: number
  playIntervals: number[]
}

export const AudioProgressBar = ({
  progress,
  playIntervals
}: AudioProgressBarProps) => {
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
            <span className="tick-text">
              {[...playIntervals].reverse()[index]}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
