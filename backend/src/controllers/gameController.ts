import type { Request, Response } from 'express'
import { youtube } from 'scrape-youtube'
import ytdl from '@distube/ytdl-core'
import { UserScoreModel } from '../models/models.js'

export const playAudio = (req: Request, res: Response) => {
  try {
    const videoId = `https://www.youtube.com/watch?v=${req.params.id}`
    console.log(req.params)

    if (!videoId) {
      res.status(400).json({ error: 'Video ID is required' })
      return
    }

    const audioStream = ytdl(videoId, {
      quality: 'highestaudio',
      filter: 'audioonly'
    })

    res.setHeader('Content-Type', 'audio/mpeg')
    res.setHeader('Content-Disposition', 'inline')

    audioStream.pipe(res)
  } catch (error) {
    console.error('Error al transmitir el audio:', error)
    res.status(500).send('Error al transmitir el audio')
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
    const user = await UserScoreModel.find({})
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
