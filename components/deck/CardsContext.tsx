import {
  createContext, FC, useContext, useState
} from 'react'
import {
  Card, Cards
} from 'scryfall-sdk'
import { useScryfallCards } from 'utils'
 
interface CardsContextType {
  cards: Card[]
  addCard: (cardName: string) => Promise<void>
  removeCard:  (card: Card) => void
  isCardInDeck: (cardName: string) => boolean
  loading: boolean
}

interface Props {
  cardIds: string[]
  children: React.ReactNode
}
const CardsContext = createContext<CardsContextType | undefined>(undefined)

export const CardsContextProvider: FC<Props> = ({
  children, cardIds 
}) => {
  const [ cards, setCards ] = useState<Card[]>([])
  const { loading } = useScryfallCards(cardIds, (c) => setCards(c))

  async function addCard(cardName: string) {
    const card = await Cards.byName(cardName)
    if (card) {
      setCards([ ...cards, card ])
    }
  }

  function removeCard(card: Card) {
    const updatedCards = cards.filter(c => c.id !== card.id)
    setCards(updatedCards)
  }

  function isCardInDeck(cardName: string): boolean {
    return !!cards.find(card => card.name === cardName)
  }

  return (
    <CardsContext.Provider value={{
      cards,
      addCard,
      removeCard,
      isCardInDeck,
      loading
    }}>
      {children}
    </CardsContext.Provider>
  )
}

export const useCards = (): CardsContextType => {
  const context = useContext(CardsContext)

  if (!context) {
    throw new Error('Must use useCards within CardsContext')
  }

  return context
}