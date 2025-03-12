import type { Request, Response } from 'express'
import { youtube } from 'scrape-youtube'
import ytdl from '@distube/ytdl-core'
import { UserScoreModel } from '../models/models.js'
let retries = 5
export const playAudio = async (req: Request, res: Response) => {
  try {
    if (!req.params.id) throw new Error('Video ID is required')

    const videoId = `https://www.youtube.com/watch?v=${req.params.id}`
    console.log('Load audio from:', videoId)

    const audioStream = ytdl(videoId, {
      quality: 'highestaudio',
      filter: 'audioonly'
    })
    /* 
     res.setHeader('Content-Type', 'audio/mpeg')
    res.setHeader('Content-Disposition', 'inline')
 */
    audioStream.on('error', async (error) => {
      console.error('Error downloading audio:', error.message)
      if (
        error.message.includes('403') ||
        error.message.includes('Video unavailable') ||
        error.message.includes('Sign in to confirm you’re not a bot')
      ) {
        console.log('Retrying with a new request...')
        await new Promise((resolve) => setTimeout(resolve, 2000)) // Espera 2s antes de reintentar
        retries -= 1
        if (retries === 0) {
          console.log('Max retries reached')
          return
        }
        return playAudio(req, res) // Llamar de nuevo la función
      }
      if (!res.headersSent) {
        res
          .status(500)
          .json({ error: `Error downloading audio: ${error.message}` })
      }
    })

    audioStream.pipe(res).on('finish', () => {
      console.log('Stream finished successfully')
      audioStream.destroy()
    })
  } catch (error: any) {
    console.error('Error streaming audio:', error.message)
  }
}

export const youtubeSerarch = async (req: Request, res: Response) => {
  try {
    const query = req.body.query

    if (!query) {
      res.status(400).json({ error: 'Query missing' })
      return
    }

    const { videos } = await youtube.search(query, { type: 'video' })

    const filteredVideos = videos.map((video) => ({
      title: video.title,
      id: video.id,
      image: video.thumbnail
    }))

    res.json(filteredVideos.slice(0, 5))
  } catch (error: any) {
    console.error('Error:', error.message)
    res.status(500).json({ error: 'Something went wrong' })
  }
}

export const getUserScore = async (req: Request, res: Response) => {
  try {
    const user = await UserScoreModel.find().limit(10)
    if (!user) {
      res.status(404).json({ error: 'User not found' })
      return
    }
    res.json(user)
  } catch (error: any) {
    console.error('Error:', error.message)
    res.status(500).json({ error: 'Something went wrong' })
  }
}
