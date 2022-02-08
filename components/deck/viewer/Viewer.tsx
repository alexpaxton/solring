import { CardsContextProvider } from 'components/deck/CardsContext'
import { ViewerBody } from 'components/deck/viewer/ViewerBody'
import { ViewerContextProvider } from 'components/deck/viewer/ViewerContext'
import { ViewerControlBar } from 'components/deck/viewer/ViewerControlBar'
import { ViewerHeader } from 'components/deck/viewer/ViewerHeader'
import { FC } from 'react'
import { DeckWithHandle } from 'types'

interface Props {
  deck: DeckWithHandle
}

export const Viewer: FC<Props> = ({ deck }) => {
  const cardIds = deck.cards as string[]

  return (
    <CardsContextProvider cardIds={cardIds}>
      <ViewerContextProvider deck={deck}>
        <ViewerHeader />
        <ViewerControlBar />
        <ViewerBody />
      </ViewerContextProvider>
    </CardsContextProvider>
  )
}
