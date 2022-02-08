import { createContext, FC, useContext } from 'react'
import { DeckWithHandle } from 'types'

interface ViewerContextType {
  title: string
  description: string
  deckId: string
  creatorHandle: string
  creatorId: string
}

interface Props {
  children: React.ReactNode
  deck: DeckWithHandle
}

const ViewerContext = createContext<ViewerContextType | undefined>(undefined)

export const ViewerContextProvider: FC<Props> = ({ children, deck }) => {
  const { title, description, id, creator, creatorId } = deck

  return (
    <ViewerContext.Provider
      value={{
        title,
        description,
        deckId: id,
        creatorHandle: creator.handle,
        creatorId,
      }}
    >
      {children}
    </ViewerContext.Provider>
  )
}

export const useDeckViewer = (): ViewerContextType => {
  const context = useContext(ViewerContext)

  if (!context) {
    throw new Error(
      'useDeckViewer must be used as a child of ViewerContextProvider',
    )
  }

  return context
}
