export const initialStateGameContext: GameContextType = {
  _id: '',
  isPlaying: false,
  host: '',
  players: [],
  winner: null,
  state: 'waiting',
  videoTitle: 'Cargando...',
  categories: [
    {
      name: 'Spanish Rock',
      players: [],
      idList: 'PL8qSav6H_QaqkyAkSLjp4cbZL-twcGN8C',
      items: []
    },
    {
      name: 'English Rock',
      players: [],
      idList: 'PLn4GvABOzCQursVQ7qMU9CkNaKz4RgrVM',
      items: []
    },
    {
      name: 'Pop',
      players: [],
      idList: 'PLm6zDcTBhQcEg3qLP-NCYGf73rOeS478g',
      items: []
    },
    {
      name: 'Hip-Hop',
      players: [],
      idList: 'PLwNv9Hhd8gZjeee8SBwokNf2JhqBvYqeB',
      items: []
    },
    {
      name: 'Latina',
      players: [],
      idList: 'PLMayUcaONleXNDB-ZTNw6c6xqixvn2SN6',
      items: []
    },
    {
      name: 'Baladas',
      players: [],
      idList: 'PLgaFNC_I_Zkm7T250PkSc4WoMvDgqtYFS',
      items: []
    }
  ],
  attempt: 0,
  categorySelected: null,
  createRoom: () => {},
  joinRoom: () => {},
  leaveRoom: () => {},
  dispatch: () => {},
  updateplayerReady: () => {},
  voteCategory: () => {},
  startGame: () => {},
  updateAttempt: () => {},
  resetGame: () => {}
}

const getFunctions = (state: GameContextType) => {
  return {
    createRoom: state.createRoom,
    joinRoom: state.joinRoom,
    leaveRoom: state.leaveRoom,
    dispatch: state.dispatch,
    updateplayerReady: state.updateplayerReady,
    voteCategory: state.voteCategory,
    startGame: state.startGame,
    updateAttempt: state.updateAttempt,
    resetGame: state.resetGame
  }
}

export const gameReducer = (state: GameContextType, action: GameAction) => {
  switch (action.type) {
    case 'JOIN_ROOM':
      return { ...action.payload, categories: state.categories }

    case 'CREATE_ROOM':
      return {
        ...action.payload,
        ...getFunctions(state)
      }

    case 'UPDATE_ROOM':
      return {
        ...action.payload.game,
        videoTitle: action.payload.game.categorySelected?.items[0]?.title ?? '',
        ...getFunctions(state)
      }

    case 'LEAVE_ROOM':
      return {
        ...state,
        host: initialStateGameContext.host,
        players: initialStateGameContext.players,
        winner: initialStateGameContext.winner,
        isPlaying: initialStateGameContext.isPlaying,
        videoTitle: initialStateGameContext.videoTitle,
        categorySelected: initialStateGameContext.categorySelected,
        state: initialStateGameContext.state,
        _id: initialStateGameContext._id,
        categories: initialStateGameContext.categories,
        attempt: initialStateGameContext.attempt
      }

    case 'TOGGLE_USER_READY':
      const filteredPlayers = state.players.filter(
        (player) => player.idGoogle !== action.payload.idGoogle
      )
      return { ...state, players: [...filteredPlayers, action.payload] }

    case 'SET_CATEGORIES':
      return {
        ...state,
        categories: action.payload
      }

    case 'TOGGLE_PLAY_PAUSE':
      /* socket.emit(EVENTS_NAME.emit.togglePlayPause, {
        isPlaying: !state.isPlaying,
        user: action.payload
      }) */
      return { ...state, isPlaying: !state.isPlaying }
    case 'SET_VIDEO_TITLE':
      return { ...state, videoTitle: action.payload.videoTitle }

    default:
      return state
  }
}
