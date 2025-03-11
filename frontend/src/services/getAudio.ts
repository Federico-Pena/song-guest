import { API_CONFIG } from '../config/config.ts'

const URL_DEV = API_CONFIG.API_URL

export const getAudio = async (id: string | undefined) => {
  try {
    if (!id) return
    const response = await fetch(`${URL_DEV}/play-audio/${id}`)
    console.log(response.ok)
    const blob = await response.blob()
    const url = URL.createObjectURL(blob)
    console.log(url)
    return url
  } catch (error) {
    console.error('Error:', error)
  }
}
