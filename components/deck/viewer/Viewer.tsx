import { Layout } from 'components/deck/Layout'
import { ViewerCard } from 'components/deck/viewer/ViewerCard'
import { EditDeckButton } from 'components/EditDeckButton'
import { PageHeader } from 'components/layout'
import { Username } from 'components/Username'
import { FC, useState } from 'react'
import { Card } from 'scryfall-sdk'
import styled from 'styled-components'
import { DeckWithHandle, LayoutMode } from 'types'
import { useScryfallCards } from 'utils'

interface Props {
  deck: DeckWithHandle
}

export const Viewer: FC<Props> = ({ deck }) => {
  const [cards, setCards] = useState<Card[]>([])
  const [mode, setMode] = useState<LayoutMode>('type')
  const cardIds = deck.cards as string[]
  const { loading } = useScryfallCards(cardIds, (c) => setCards(c))

  const body = loading ? (
    <Loading>
      <p>Loading...</p>
    </Loading>
  ) : (
    <Layout cards={cards} mode={mode}>
      {(items) =>
        items.map((item) => (
          <ViewerCard key={item.card.id} card={item.card} {...item.pos} />
        ))
      }
    </Layout>
  )

  return (
    <>
      <StyledPageHeader>
        <TitleBar>
          <h1>{deck.title}</h1>
          <EditDeckButton creatorId={deck.creatorId} deckId={deck.id} />
        </TitleBar>
        <span>
          <button onClick={() => setMode('type')}>Type</button>
          <button onClick={() => setMode('color')}>Color</button>
          <button onClick={() => setMode('cmc')}>CMC</button>
        </span>
        <p>
          Created by <Username>{deck.creator.handle}</Username>
        </p>
        <Description>{deck.description || 'No description'}</Description>
      </StyledPageHeader>
      {body}
    </>
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

const Loading = styled.div`
  flex: 1 0 0;
  width: 100%;
  padding: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
`
