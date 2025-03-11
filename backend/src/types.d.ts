import type { UUID } from 'node:crypto'

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

interface GameModelDB {
  _id: string
  host: string
  players: Player[]
  winner: string | null
  videoTitle: string | null
  isPlaying: boolean
  categories: Category[]
  categorySelected: Category | null
  state: GameState
  attempt: number
}

type EventNames =
  | 'connection'
  | 'disconnect'
  | 'login'
  | 'createRoom'
  | 'leaveRoom'
  | 'joinRoom'
  | 'toggleReady'
  | 'voteCategory'
  | 'startGame'
  | 'resetGame'
  | 'togglePlayPause'
  | 'updateAttempt'
  | 'error'
  | 'countdown'

type EventNamesConst = Record<EventNames, EventNames>

type EventsMap = {
  connection: any
  disconnect: any
  login: { user: Player }
  createRoom: { user: Player; categories: Category[] }
  leaveRoom: { user: Player }
  toggleReady: { user: Player }
  joinRoom: { gameId: string; user: Player }
  voteCategory: { user: Player; category: string }
  startGame: { user: Player; state: GameState }
  resetGame: { user: Player }
  togglePlayPause: { user: Player; isPlaying: boolean }
  updateAttempt: { user: Player; attempt: number; text: string }
  error: { error: string }
  countdown: { time: number; game: GameModelDB }
}

type ListenEvent<K extends keyof EventsMap> = {
  eventName: K
  data: EventsMap[K]
}
