import { CardsContextProvider } from 'components/deck/CardsContext'
import { EditorBody } from 'components/deck/editor/EditorBody'
import { EditorContextProvider } from 'components/deck/editor/EditorContext'
import { EditorControlbar } from 'components/deck/editor/EditorControlBar'
import { EditorHeader } from 'components/deck/editor/EditorHeader'
import { FC } from 'react'
import { DeckWithHandle } from 'types'

interface Props {
  deck: DeckWithHandle
}

export const Editor: FC<Props> = ({ deck }) => {
  const cardIds = deck.cards as string[]

  return (
    <CardsContextProvider cardIds={cardIds}>
      <EditorContextProvider deck={deck}>
        <EditorHeader />
        <EditorControlbar />
        <EditorBody />
      </EditorContextProvider>
    </CardsContextProvider>
  )
}
