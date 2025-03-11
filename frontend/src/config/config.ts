const API_URL =
  import.meta.env.MODE === 'development' ? import.meta.env.VITE_URL_DEV : '/'
const clientId = import.meta.env.VITE_GOOGLE_CLOUD_CLIENT_ID as string
const SPOTIFY_CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID
const SPOTIFY_CLIENT_SECRET = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET

export const API_CONFIG = {
  API_URL,
  clientId,
  SPOTIFY_CLIENT_ID,
  SPOTIFY_CLIENT_SECRET
}
