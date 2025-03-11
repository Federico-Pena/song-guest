type GameState = 'waiting' | 'in-progress' | 'finished'

interface Player {
  idGame: string
  ready: boolean
  points: number
  name: string
  picture: string
  idGoogle: string
  attempt: number
}
interface UserScore {
  idGoogle: string
  name: string
  picture: string
  points: number
}
interface CategoryItem {
  title: string
  id: string
  thumbnail: string
}

interface Category {
  name:
    | 'Spanish Rock'
    | 'English Rock'
    | 'Pop'
    | 'Hip-Hop'
    | 'Latina'
    | 'Baladas'
  players: string[]
  idList: string
  items: CategoryItem[]
}

interface GameModel {
  _id: string
  host: string
  players: Player[]
  winner: string | null
  contextGame: Room | null
  isPlaying: boolean
  videoTitle: string | null
  videoPlayer: YT.Player | null
  categories: Category[]
  categorySelected: Category | null
  attempt: number
  state: GameState
}

interface GameContextType {
  _id: string
  host: string
  players: Player[]
  winner: string | null
  isPlaying: boolean
  videoTitle: string | null
  categories: Category[]
  attempt: number
  categorySelected: Category | null
  state: GameState
  attempt: number
  createRoom: () => void
  joinRoom: (gameId: string) => void
  leaveRoom: () => void
  updateplayerReady: () => void
  dispatch: React.Dispatch<GameAction>
  voteCategory: (category: string) => void
  startGame: () => void
  updateAttempt: (text: string) => void
  resetGame: () => void
}

type GameAction =
  | { type: 'JOIN_ROOM'; payload: Room }
  | { type: 'CREATE_ROOM'; payload: Room }
  | { type: 'UPDATE_ROOM'; payload: { game: GameModel } }
  | { type: 'LEAVE_ROOM'; payload: Player }
  | { type: 'TOGGLE_USER_READY'; payload: Player }
  | { type: 'SET_CATEGORIES'; payload: Category[] }
  | { type: 'SET_VIDEO_TITLE'; payload: { videoTitle: string } }
  | { type: 'TOGGLE_PLAY_PAUSE' }

type CountdownContextType = {
  countdown: number
  isFullScreen: boolean
  handleCountdown: React.Dispatch<React.SetStateAction<number>>
  handleIsFullScreen: React.Dispatch<React.SetStateAction<boolean>>
}

type EventNames =
  | 'login'
  | 'createRoom'
  | 'joinRoom'
  | 'leaveRoom'
  | 'toggleReady'
  | 'voteCategory'
  | 'startGame'
  | 'error'
  | 'updateAttempt'
  | 'resetGame'

type EventsMap = {
  leaveRoom: { game: GameModel; user: Player }
  joinRoom: { game: GameModel; user: Player }
  login: { user: Player }
  toggleReady: { user: Player }
  createRoom: { game: GameModel }
  startGame: { game: GameModel }
  voteCategory: { categories: Category[] }
  error: { error: string }
  updateAttempt: { user: Player; game: GameModel }
  resetGame: { user: Player; game: GameModel }
}
type EventNamesConst = Record<EventNames, EventNames>

type ListenEvent<K extends keyof EventsMap> = {
  eventName: K
  data: EventsMap[K]
}
