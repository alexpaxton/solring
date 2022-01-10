import {
  createContext, FC, useContext, useState
} from 'react'
import { Card } from 'scryfall-sdk'

interface SearchContextType {
  results: Card[]
  updateResults: (cards: Card[]) => void
  loading: boolean
  updateLoading: (loading: boolean) => void
}
const SearchContext = createContext<SearchContextType | undefined>(undefined)

export const SearchContextProvider: FC = ({ children }) => {
  const [ results, updateResults ] = useState<Card[]>([])
  const [ loading, updateLoading ] = useState<boolean>(false)

  return <SearchContext.Provider value={{
    results,
    updateResults,
    loading,
    updateLoading,
  }}>{children}</SearchContext.Provider>
}

export const useSearchResults = (): SearchContextType => {
  const context = useContext(SearchContext)

  if (context === undefined) {
    throw new Error('useSearchResults must be called from a child component of SearchContextProvider')
  }

  return context
}