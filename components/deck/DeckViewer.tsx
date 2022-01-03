import { MagicCard } from 'components/cards/MagicCard'
import { CardGrid } from 'components/deck/CardGrid'
import { EditDeckButton } from 'components/EditDeckButton'
import { Username } from 'components/Username'
import {
  FC, useState
} from 'react'
import { Card } from 'scryfall-sdk'
import styled from 'styled-components'
import { DeckWithHandle } from 'types'
import { useScryfallCards } from 'utils'

interface Props {
  deck: DeckWithHandle
}

export const DeckViewer: FC<Props> = ({ deck }) => {
  const [ cards, setCards ] = useState<Card[]>([])
  const cardIds = deck.cards as string[]
  const { loading } = useScryfallCards(cardIds, (c) => setCards(c))

  return (
    <>
      <DeckMeta>
        <TitleBar>
          <h1>{deck.title}</h1>
          <EditDeckButton creatorId={deck.creatorId} deckId={deck.id} />
        </TitleBar>
        <p>
          Created by <Username>{deck.creator.handle}</Username>
        </p>
        <Description>{deck.description || 'No description'}</Description>
      </DeckMeta>
      <Deck>
        {loading && <p>Loading...</p>}
        {!!cards.length && <CardGrid>{cards.map(card => <MagicCard key={card.id} {...card}/>)}</CardGrid>}
        {!cards.length && <p>This deck has no cards yet</p>}
      </Deck>
    </>
  )
}

const DeckMeta = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #eee;
  padding: 30px;
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

const Deck = styled.div`
  flex: 1 0 0;
  width: 100%;
  padding: 30px;
  overflow: auto;
`
