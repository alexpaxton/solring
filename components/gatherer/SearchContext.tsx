import {
  FiltersContextType,
  useFilters,
} from 'components/gatherer/FiltersContext'
import { createContext, FC, useContext, useState } from 'react'
import { Card, Cards } from 'scryfall-sdk'

interface SearchContextType {
  results: Card[]
  loading: boolean
  search: () => Promise<void>
  error: null | string
  focusedCard: Card | null
  setFocusedCard: (card: Card | null) => void
}
const SearchContext = createContext<SearchContextType | undefined>(undefined)

export const SearchContextProvider: FC = ({ children }) => {
  const [results, updateResults] = useState<Card[]>([])
  const [loading, updateLoading] = useState<boolean>(false)
  const [error, updateError] = useState<string | null>(null)
  const [focusedCard, setFocusedCard] = useState<Card | null>(null)
  const filters = useFilters()

  async function search() {
    updateLoading(true)
    setFocusedCard(null)
    const query = getQuery(filters)
    console.log(`%cQuery: ${query}`, 'color: #766cff')
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

  return (
    <SearchContext.Provider
      value={{
        results,
        loading,
        search,
        error,
        focusedCard,
        setFocusedCard,
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

const allColors = ['w', 'u', 'b', 'r', 'g']

function getQuery({
  cardName,
  ruleText,
  cmc,
  cmcAlt,
  cmcMode,
  cardType,
  colors,
  colorMode,
}: FiltersContextType): string {
  const query = ['-is:funny']

  cardName.length && query.push(`name:${cardName}`)

  if (cardType.length && cardType.includes(' ')) {
    const cardTypes = cardType.split(' ')
    cardTypes.forEach((type) => query.push(`type:${type}`))
  } else if (cardType.length) {
    query.push(`type:${cardType}`)
  }

  if (ruleText.length && ruleText.startsWith('"') && ruleText.endsWith('"')) {
    query.push(`oracle:${ruleText}`)
  } else if (ruleText.length && ruleText.includes(' ')) {
    const ruleTextWords = ruleText.split(' ')
    ruleTextWords.forEach((word) => query.push(`o:${word}`))
  } else if (ruleText.length) {
    query.push(`o:${ruleText}`)
  }

  switch (cmcMode) {
    case 'exactly':
      query.push(`cmc:${cmc}`)
      break
    case 'atLeast':
      query.push(`cmc>=${cmc}`)
      break
    case 'atMost':
      query.push(`cmc<=${cmc}`)
      break
    case 'between':
      query.push(`cmc>=${cmc} cmc<=${cmcAlt}`)
      break
  }

  if (colors.length) {
    const colorsExcluded = allColors.filter((c) => !colors.includes(c))

    switch (colorMode) {
      case 'exactly':
        query.push(`c:${colors.join('')}`)
        colorsExcluded.forEach((color) => query.push(`-c:${color}`))
        break
      case 'exclude':
        colors.forEach((color) => query.push(`-c:${color}`))
        break
      case 'include':
        query.push(`c:${colors.join('')}`)
        break
    }
  }

  return query.join(' ')
}
