import { createContext, FC, useContext, useState } from 'react'
import { Card } from 'scryfall-sdk'

interface InspectorContextType {
  inspectedCard: Card | null
  inspectCard: (card: Card) => void
  dismissInspector: () => void
}

const InspectorContext = createContext<InspectorContextType | undefined>(
  undefined,
)

export const InspectorContextProvider: FC = ({ children }) => {
  const [card, setCard] = useState<Card | null>(null)

  function dismissInspector() {
    setCard(null)
  }

  function inspectCard(card: Card) {
    setCard(card)
  }

  return (
    <InspectorContext.Provider
      value={{
        inspectedCard: card,
        inspectCard,
        dismissInspector,
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
