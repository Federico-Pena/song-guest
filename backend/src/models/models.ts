import mongoose from 'mongoose'

const CategoryItem = new mongoose.Schema({
  title: { type: String, required: true },
  id: { type: String, required: true },
  thumbnail: { type: String, required: true }
})

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    enum: [
      'Spanish Rock',
      'English Rock',
      'Pop',
      'Hip-Hop',
      'Latina',
      'Baladas'
    ],
    required: true
  },
  players: { type: Array, default: [] },
  idList: { type: String, default: '' },
  items: [CategoryItem]
})

const UserScoreSchema = new mongoose.Schema({
  idGoogle: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  picture: { type: String, required: true },
  points: { type: Number, default: 0 },
  games: { type: Number, default: 0 }
})

const UserSchema = new mongoose.Schema({
  idGame: { type: String },
  ready: { type: Boolean, default: false },
  points: { type: Number, default: 0 },
  name: { type: String, required: true },
  picture: { type: String, required: true },
  idGoogle: { type: String, required: true, unique: true },
  attempt: { type: Number, default: 0 }
})

const GameSchema = new mongoose.Schema({
  host: { type: String, required: true },
  players: [UserSchema],
  winner: { type: String, default: null },
  isPlaying: { type: Boolean, default: false },
  videoTitle: { type: String, default: null },
  categories: [CategorySchema],
  categorySelected: { type: CategorySchema, default: null },
  attempt: { type: Number, default: 0 },
  state: {
    type: String,
    enum: ['waiting', 'in-progress', 'finished'],
    default: 'waiting'
  }
})

export const GameModel = mongoose.model('Game', GameSchema)
export const UserScoreModel = mongoose.model('UserScore', UserScoreSchema)
