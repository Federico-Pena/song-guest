import { Router } from 'express'
import {
  getUserScore,
  playAudio,
  youtubeSerarch
} from '../controllers/gameController.js'

const router = Router()
router.get('/socket', (req, res) => {
  res.send('Servidor de sockets activo')
})

router.post('/youtube-search', youtubeSerarch)
router.get('/user-score', getUserScore)
router.get('/play-audio/:id', playAudio)

export default router
