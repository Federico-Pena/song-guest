import { UseGameContext } from '../../context/GameContext.tsx'
import { UseToastContext } from '../../context/ToastContext.tsx'
import { CopyIcon, LeaveIcon } from '../icons/Icons.tsx'

export const HeaderRoom = () => {
  const { addToast } = UseToastContext()
  const contextGame = UseGameContext()

  const copyToClipboard = () => {
    if (contextGame?._id) {
      navigator.clipboard.writeText(contextGame?._id)
      addToast({
        text: `Copied`,
        duration: 3000,
        className: 'toast-success'
      })
    } else {
      addToast({
        text: `No room ID`,
        duration: 3000,
        className: 'toast-warning'
      })
    }
  }

  const handleLeaveRoom = () => {
    contextGame.leaveRoom()
  }

  return contextGame.state === 'waiting' ? (
    <header className="room-header">
      <div>
        <span className="copy-room-id flex" onClick={copyToClipboard}>
          <samp>{contextGame?._id ?? 'No room ID'}</samp>
          <CopyIcon />
        </span>
        <span className="btn-leave-room flex" onClick={handleLeaveRoom}>
          Leave Room <LeaveIcon />
        </span>
      </div>
      <div>
        {contextGame?.host && <h3>Host: {contextGame?.host}</h3>}
        {contextGame?.players.length > 0 && (
          <h3>Users Online: {contextGame?.players.length}</h3>
        )}
      </div>
    </header>
  ) : null
}
