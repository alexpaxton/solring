import { CardsContextProvider } from 'components/deck/editor/CardsContext'
import { EditDeckButton } from 'components/deck/viewer/EditDeckButton'
import { ViewerBody } from 'components/deck/viewer/ViewerBody'
import { ViewerControlBar } from 'components/deck/viewer/ViewerControlBar'
import { PageHeader } from 'components/layout'
import { Username } from 'components/Username'
import { FC } from 'react'
import styled from 'styled-components'
import { DeckWithHandle } from 'types'

interface Props {
  deck: DeckWithHandle
}

export const Viewer: FC<Props> = ({ deck }) => {
  const cardIds = deck.cards as string[]

  return (
    <CardsContextProvider cardIds={cardIds}>
      <StyledPageHeader>
        <TitleBar>
          <h1>{deck.title}</h1>
          <EditDeckButton creatorId={deck.creatorId} deckId={deck.id} />
        </TitleBar>
        <p>
          Created by <Username>{deck.creator.handle}</Username>
        </p>
        <Description>{deck.description || 'No description'}</Description>
      </StyledPageHeader>
      <ViewerControlBar />
      <ViewerBody />
    </CardsContextProvider>
  )
}

const StyledPageHeader = styled(PageHeader)`
  flex-direction: column;
`

const TitleBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const Description = styled.p`
  font-size: 13px;
  margin-top: 24px;
`
