import { createContext, FC, useContext, useState } from 'react'
import { Card } from 'scryfall-sdk'

interface FocusContextType {
  focusedCard: Card | null
  setFocusedCard: (card: Card | null) => void
}

const FocusContext = createContext<FocusContextType | undefined>(undefined)

export const FocusContextProvider: FC = ({ children }) => {
  const [focusedCard, setFocusedCard] = useState<Card | null>(null)

  return (
    <FocusContext.Provider
      value={{
        focusedCard,
        setFocusedCard,
      }}
    >
      {children}
    </FocusContext.Provider>
  )
}

export const useFocusedCard = (): FocusContextType => {
  const context = useContext(FocusContext)

  if (context === undefined) {
    throw new Error(
      'useFocusedCard must be called from a child component of FocusContextProvider',
    )
  }

  return context
}
