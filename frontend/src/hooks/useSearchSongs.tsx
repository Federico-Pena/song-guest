import { useState, useEffect } from 'react'
import { searchSongs } from '../services/searchSongs.ts'
import { UseLoader } from '../context/LoaderContext.tsx'

export const useSearchSongs = (query: string) => {
  const [results, setResults] = useState<
    { title: string; id: string; image: string }[]
  >([])
  const [lastQuery, setLastQuery] = useState(' ')
  const { showLoader, hideLoader } = UseLoader()

  useEffect(() => {
    const textTrimed = query.trim()

    if (textTrimed.length === 0) {
      setResults([])
      hideLoader()
      return
    }
    if (query === lastQuery) return
    showLoader()

    const delaySearch = setTimeout(async () => {
      try {
        const songs = await searchSongs(textTrimed)
        setResults(songs)
      } catch (error) {
        console.error('Error buscando en YouTube:', error)
      } finally {
        hideLoader()
        setLastQuery(query)
      }
    }, 700)

    return () => clearTimeout(delaySearch)
  }, [query, showLoader, hideLoader, lastQuery])

  const cleanResults = () => setResults([])
  const setTheLastQuery = (query: string) => setLastQuery(query)
  return { results, cleanResults, setTheLastQuery }
}
