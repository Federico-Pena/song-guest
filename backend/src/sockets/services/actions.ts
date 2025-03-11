import type { Server, Socket } from 'socket.io'
import type { EventsMap, GameModelDB } from '../../types.js'
import { updateUserInDb } from '../utils/dbUtils.js'
import { catchErrorController } from '../utils/catchErrorController.js'
import { EVENT_NAMES } from '../gameSocket.js'
import { GameModel, UserScoreModel } from '../../models/models.js'
import ytpl from 'ytpl'

export const updateAttemptController = async (
  data: EventsMap['updateAttempt'],
  socket: Socket,
  io: Server
) => {
  try {
    const { user, attempt, text } = data
    if (data.user.idGame === 'idGame') return
    const game = await GameModel.findById(user.idGame)
    if (!game) return
    game.players = game.players.map((p) => {
      if (p.idGoogle === user.idGoogle) {
        return { ...p, attempt: attempt }
      }
      return p
    }) as any
    const allEqual = game.players.every((p) => p.attempt === attempt)
    if (allEqual) {
      game.attempt = attempt
    }
    if (text.trim().toLowerCase() === game.videoTitle?.trim().toLowerCase()) {
      game.state = 'finished'
      game.winner = user.name
      const newUser = await UserScoreModel.findOne({
        idGoogle: user.idGoogle
      })
      if (newUser) {
        newUser.points = newUser.points + 1
        await newUser.save()
      } else if (user.idGoogle !== 'guest') {
        const newUser = new UserScoreModel({
          idGoogle: user.idGoogle,
          name: user.name,
          picture: user.picture,
          points: 1
        })
        await newUser.save()
      }
    }
    if (game.attempt === 6) {
      game.state = 'finished'
    }
    const newGame = await game.save()
    if (!newGame) return
    io.to(newGame._id.toString()).emit(EVENT_NAMES.updateAttempt, {
      user: newGame.players.find((p) => p.idGoogle === user.idGoogle),
      game: newGame
    })
  } catch (error: any) {
    catchErrorController('updateAttemptController', error)
  }
}

export const togglePlayPauseController = async (
  data: EventsMap['togglePlayPause'],
  socket: Socket,
  io: Server
) => {
  try {
    const game = await updateUserInDb(data.user)
    if (!game) return
    io.to(game?._id.toString()).emit(EVENT_NAMES.togglePlayPause, {
      user: data.user,
      isPlaying: data.isPlaying
    })
  } catch (error: any) {
    catchErrorController('togglePlayPauseController', error)
  }
}

export const toggleReadyController = async (
  data: EventsMap['toggleReady'],
  socket: Socket,
  io: Server
) => {
  try {
    data.user.ready = !data.user.ready
    const game = await updateUserInDb(data.user)
    if (!game) return
    io.to(game?._id.toString()).emit(EVENT_NAMES.toggleReady, {
      user: data.user
    })
  } catch (error: any) {
    catchErrorController('toggleReadyController', error)
  }
}

export const voteCategoryController = async (
  data: EventsMap['voteCategory'],
  socket: Socket,
  io: Server
) => {
  try {
    if (data.user.idGame === 'idGame') return

    const game = await GameModel.findById(data.user.idGame)
    if (!game) return

    const newCategories = game.categories.map((c) => {
      if (c.name === data.category) {
        return {
          ...c,
          players: c.players.includes(data.user.idGoogle)
            ? c.players
            : [...c.players, data.user.idGoogle]
        }
      } else {
        return {
          ...c,
          players: c.players.filter((id) => id !== data.user.idGoogle)
        }
      }
    })

    game.categories = newCategories as any
    const newGame = await game.save()
    if (!newGame) return
    io.to(newGame._id.toString()).emit(EVENT_NAMES.voteCategory, {
      categories: newGame.categories
    })

    console.log('voteCategoryController')
  } catch (error: any) {
    catchErrorController('voteCategoryController', error)
  }
}

export const startGameController = async (
  data: EventsMap['startGame'],
  socket: Socket,
  io: Server
) => {
  try {
    const game = await GameModel.findById(data.user.idGame)
    if (!game) return
    game.categorySelected = await getMostVotedCategory(game as any)
    game.state = data.state
    game.videoTitle = game.categorySelected?.items[0]?.title ?? ''
    const newGame = await game.save()
    if (!newGame) return
    io.to(newGame._id.toString()).emit(EVENT_NAMES.startGame, {
      game: newGame
    })
  } catch (error: any) {
    catchErrorController('startGameController', error)
  }
}

export const resetGameController = async (
  data: EventsMap['resetGame'],
  socket: Socket,
  io: Server
) => {
  try {
    const game = await GameModel.findById(data.user.idGame)
    if (!game) return
    game.state = 'waiting'
    game.attempt = 0
    game.winner = null as any
    game.videoTitle = null as any
    game.categorySelected = null as any
    game.categories = game.categories.map((c) => {
      return { ...c, players: [] }
    }) as any
    game.players = game.players.map((p) => {
      return { ...p, ready: false, points: 0, attempt: 0 }
    }) as any
    const newUser = { ...data.user, ready: false, points: 0, attempt: 0 }
    const newGame = await game.save()
    if (!newGame) return
    io.to(newGame._id.toString()).emit(EVENT_NAMES.resetGame, {
      game: newGame,
      user: newUser
    })
  } catch (error: any) {
    catchErrorController('resetGameController', error)
  }
}

export const countdownController = async (
  data: EventsMap['countdown'],
  socket: Socket,
  io: Server
) => {
  try {
    let { game, time } = data
    if (!game) return
    const gameStored = await GameModel.findById(game._id)
    if (!gameStored) return
    let preparationInterval: NodeJS.Timer
    preparationInterval = setInterval(() => {
      io.to(game._id).emit(EVENT_NAMES.countdown, {
        time
      })
      time--
      if (time < 0) {
        clearInterval(preparationInterval as any)
      }
    }, 1000)
  } catch (error: any) {
    catchErrorController('countdownController', error)
  }
}

const getMostVotedCategory = async (game: GameModelDB) => {
  const sortedCategories = [...game.categories].sort(
    (a, b) => b.players.length - a.players.length
  )
  if (sortedCategories[0]) {
    const audios = await getInfoFromPlaylist(sortedCategories[0].idList)
    if (!audios) return
    const random = Math.floor(Math.random() * audios.length - 1)
    sortedCategories[0].items = audios?.slice(random, random + 5)
  }
  return sortedCategories[0] ?? (null as any)
}

const getInfoFromPlaylist = async (playlistId: string) => {
  try {
    const playlist = await ytpl(playlistId, { pages: 1 })
    const videoData = []
    for (const video of playlist.items) {
      const videoId = video.id
      const title = video.title
      const thumbnail = video.thumbnails[0]?.url ?? ''
      videoData.push({ title, id: videoId, thumbnail })
    }
    return videoData
  } catch (error) {
    console.error('Error:', error)
  }
}
