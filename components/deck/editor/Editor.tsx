import { DeckMeta } from 'components/deck/DeckMeta'
import { DeckPreview } from 'components/deck/DeckPreview'
import { CardsContextProvider } from 'components/deck/editor/CardsContext'
import { DeckContextProvider } from 'components/deck/editor/DeckContext'
import { SearchWidget } from 'components/SearchWidget'
import { FC } from 'react'
import { DeckWithHandle } from 'types'

interface Props {
  deck: DeckWithHandle
}

export const Editor: FC<Props> = ({ deck }) => {
  const cardIds = deck.cards as string[]
  return (
    <CardsContextProvider cardIds={cardIds}>
      <DeckContextProvider deck={deck}>
        <DeckMeta deckId={deck.id} />
        <SearchWidget />
        <DeckPreview />
      </DeckContextProvider>
    </CardsContextProvider>
  )
}
