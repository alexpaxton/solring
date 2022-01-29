import { createContext, FC, useContext, useState } from 'react'
import { Card } from 'scryfall-sdk'

interface InspectorContextType {
  focusedCard: Card | null
  setFocusedCard: (card: Card | null) => void
}

const InspectorContext = createContext<InspectorContextType | undefined>(
  undefined,
)

export const InspectorContextProvider: FC = ({ children }) => {
  const [focusedCard, setFocusedCard] = useState<Card | null>(null)

  return (
    <InspectorContext.Provider
      value={{
        focusedCard,
        setFocusedCard,
      }}
    >
      {children}
    </InspectorContext.Provider>
  )
}

export const useInspector = (): InspectorContextType => {
  const context = useContext(InspectorContext)

  if (context === undefined) {
    throw new Error(
      'useInspector must be called from a child component of InspectorContextProvider',
    )
  }

  return context
}
