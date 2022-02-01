import { useRouter } from 'next/router'
import { createContext, FC, useContext, useEffect, useState } from 'react'
import { Card, Cards } from 'scryfall-sdk'
import {
  extractFilters,
  getQueryString,
  getScryfallQuery,
  parseQueryString,
} from 'utils'
import { FiltersState, useFilters } from './FiltersContext'

interface SearchContextType {
  results: Card[]
  loading: boolean
  search: () => Promise<void>
  error: null | string
}
const SearchContext = createContext<SearchContextType | undefined>(undefined)

export const SearchContextProvider: FC = ({ children }) => {
  const { pathname, push } = useRouter()
  const [results, updateResults] = useState<Card[]>([])
  const [loading, updateLoading] = useState<boolean>(false)
  const [error, updateError] = useState<string | null>(null)
  const filtersContext = useFilters()

  useEffect(() => {
    const rehydratedFilters = parseQueryString(window.location.search)
    if (rehydratedFilters) {
      filtersContext.dispatch({
        type: 'rehydrateFilters',
        payload: rehydratedFilters,
      })
      executeSearch(rehydratedFilters)
    }
  }, [])

  async function executeSearch(params?: FiltersState) {
    const filters = params || extractFilters(filtersContext)
    updateLoading(true)
    const query = getScryfallQuery(filters)
    const qs = getQueryString(filters)
    console.log(`%cQuery: ${query}`, 'color: #766cff')
    push(`${pathname}?${qs}`, undefined, { shallow: true })
    const data = await Cards.search(query)
    const cards = await data.waitForAll()
    const onlyCards = cards.slice(0, cards.length - 1)
    if (!onlyCards.length) {
      updateResults([])
      updateError('No cards matched your query')
    } else {
      updateResults(cards)
      updateError(null)
    }
    updateLoading(false)
  }

  async function search() {
    await executeSearch()
  }

  return (
    <SearchContext.Provider
      value={{
        results,
        loading,
        search,
        error,
      }}
    >
      {children}
    </SearchContext.Provider>
  )
}

export const useSearchResults = (): SearchContextType => {
  const context = useContext(SearchContext)

  if (context === undefined) {
    throw new Error(
      'useSearchResults must be called from a child component of SearchContextProvider',
    )
  }

  return context
}
