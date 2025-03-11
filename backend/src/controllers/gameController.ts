import type { Request, Response } from 'express'
import { youtube } from 'scrape-youtube'
import ytdl from '@distube/ytdl-core'
import { UserScoreModel } from '../models/models.js'

export const playAudio = async (req: Request, res: Response) => {
  try {
    if (!req.params.id) throw new Error('Video ID is required')

    const videoId = `https://www.youtube.com/watch?v=${req.params.id}`
    console.log('Load audio from:', videoId)

    const audioStream = ytdl(videoId, {
      quality: 'highestaudio',
      filter: 'audio'
    })

    res.setHeader('Content-Type', 'audio/mp3')
    res.setHeader('Content-Disposition', 'inline')
    audioStream.pipe(res)
  } catch (error: any) {
    console.error('Error streaming audio:', error.message)
    res.status(500).json({ error: `Error streaming audio: ${error.message}` })
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
