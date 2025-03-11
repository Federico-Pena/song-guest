interface SpotifyTrack {
  id: string
  name: string
  album: { images: { url: string }[] }
}

interface SpotifySearchResponse {
  tracks: {
    items: SpotifyTrack[]
  }
}

const SPOTIFY_CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID
const SPOTIFY_CLIENT_SECRET = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET

const getSpotifyToken = async (): Promise<string> => {
  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${btoa(
        `${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`
      )}`
    },
    body: 'grant_type=client_credentials'
  })
  const data = await response.json()
  return data.access_token
}

const searchSpotify = async (
  query: string
): Promise<{ title: string; id: string; image: string }[]> => {
  try {
    const token = await getSpotifyToken()
    const response = await fetch(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(
        query
      )}&type=track&limit=5`,
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    )
    if (response.status === 429) throw new Error('Rate limit exceeded')
    const data: SpotifySearchResponse = await response.json()
    return (
      data.tracks.items?.map((track) => {
        return {
          title: track.name,
          id: track.id,
          image: track.album.images[0]?.url
        }
      }) || []
    )
  } catch (error) {
    console.warn('Spotify API error, switching to YouTube:', error)
    return []
  }
}

const searchSongYoutube = async (query: string) => {
  const youtubeResults = await fetch('http://localhost:1234/youtube-search', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ query })
  })
  const data = await youtubeResults.json()
  return data
}

export const searchSongs = async (
  query: string
): Promise<{ title: string; id: string; image: string }[]> => {
  if (!query) return []
  const youtubeResults = await searchSongYoutube(query)
  return youtubeResults.length > 0 ? youtubeResults : await searchSpotify(query)
}
