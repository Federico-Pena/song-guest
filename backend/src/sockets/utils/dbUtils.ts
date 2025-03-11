import { GameModel } from '../../models/models.js'
import type { Player } from '../../types.js'

const catchErrorDb = (error: any) => {
  console.error('Error:', error.message)
  if (error.code === 11000) {
    const duplicateKey = Object.keys(error.keyValue)[0]
    console.error(`Error: Duplicado en el campo '${duplicateKey}'`)
  }
}

export const deleteUserFromDb = async (user: Player) => {
  try {
    const result = await GameModel.updateMany(
      { 'players.idGoogle': user.idGoogle },
      { $pull: { players: { idGoogle: user.idGoogle } } }
    )
    await cleanEmptyRooms()
    return result.modifiedCount > 0
  } catch (error) {
    catchErrorDb(error)
    return false
  }
}

export const addUserToDb = async (user: Player, gameId: string) => {
  try {
    const updatedGame = await GameModel.findOneAndUpdate(
      { _id: gameId },
      { $addToSet: { players: user } },
      { new: true }
    )
    return updatedGame
  } catch (error) {
    catchErrorDb(error)
  }
}

export const updateUserInDb = async (user: Player) => {
  try {
    const updatedGame = await GameModel.findOneAndUpdate(
      { 'players.idGoogle': user.idGoogle },
      { $set: { 'players.$': user } },
      { new: true }
    )
    return updatedGame
  } catch (error: any) {
    catchErrorDb(error)
  }
}

export const cleanEmptyRooms = async () => {
  try {
    const result = await GameModel.deleteMany({ players: { $size: 0 } })
    if (result.deletedCount > 0) {
      console.log(`${result.deletedCount} empty rooms have been deleted.`)
    } else {
      console.log('No empty rooms to delete.')
    }
  } catch (error: any) {
    catchErrorDb(error)
  }
}
