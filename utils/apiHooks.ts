import useSWR, { Fetcher } from 'swr'
import { APIMeData, DeckWithHandle } from 'types'

const fetchDecksWithHandles: Fetcher<DeckWithHandle[], string> = (url) =>
  fetch(url).then((res) => res.json())

interface UseDecksWithHandles {
  decks?: DeckWithHandle[]
  isLoading: boolean
  isError: Error
}

export const useDecksWithHandles = (): UseDecksWithHandles => {
  const { data, error } = useSWR('/api/decks/all', fetchDecksWithHandles)

  return {
    decks: data,
    isLoading: !error && !data,
    isError: error,
  }
}

const fetchMe = async (url: string) => fetch(url).then((res) => res.json())
export const useMe = () => {
  const { data, error } = useSWR<APIMeData>('/api/me', fetchMe)
  return {
    me: data?.data,
    isLoading: !error && !data,
    isError: !!error || !!data?.error,
  }
}

// Deprecated
const cardSearchFetcher = async (url: string, query: string) =>
  fetch(`${url}${query}`).then((res) => res.json())

export const useCardSearch = (query: Record<string, string | number>) => {
  const queryString = objectToString(query)
  const { data, error } = useSWR(
    ['/api/search/cards', queryString],
    cardSearchFetcher,
  )

  return {
    data,
    isError: error,
  }
}

function objectToString(obj: Record<string, string | number>): string {
  const entries = Object.entries(obj)
  const result: string[] = []
  entries.forEach((entry, i) => {
    const prefix = i === 0 ? '?' : '&'
    result.push(`${prefix}${entry[0]}=${entry[1]}`)
  })

  return result.join('')
}
