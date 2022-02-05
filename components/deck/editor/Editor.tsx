import { DeckMeta } from 'components/deck/DeckMeta'
import { CardsContextProvider } from 'components/deck/editor/CardsContext'
import { DeckContextProvider } from 'components/deck/editor/DeckContext'
import { EditorBody } from 'components/deck/editor/EditorBody'
import { EditorControlbar } from 'components/deck/editor/EditorControlBar'
import { FC, useState } from 'react'
import { DeckWithHandle, LayoutMode } from 'types'

interface Props {
  deck: DeckWithHandle
}

export const Editor: FC<Props> = ({ deck }) => {
  const [mode, setMode] = useState<LayoutMode>('type')
  const cardIds = deck.cards as string[]

  return (
    <CardsContextProvider cardIds={cardIds}>
      <DeckContextProvider deck={deck}>
        <DeckMeta deckId={deck.id} />
        <EditorControlbar />
        <EditorBody mode={mode} />
      </DeckContextProvider>
    </CardsContextProvider>
  )
}
