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
