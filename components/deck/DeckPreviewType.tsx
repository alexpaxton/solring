import { PreviewCard } from 'components/cards/PreviewCard'
import { useCards } from 'components/deck/CardsContext'
import { useDeck } from 'components/deck/DeckContext'
import { FC } from 'react'
import { Card } from 'scryfall-sdk'
import styled from 'styled-components'
import { pluralizer } from 'utils'

interface CurvedCards {
  [key: string]: Card[]
}

type Stack = [string, Card[]]

export const DeckPreviewType: FC = () => {
  const { cards } = useCards()
  const { mode } = useDeck()

  if (mode !== 'type') {
    return null
  }

  const curvedCards = groupCardsByType(cards)
  const stacks: Stack[] = Object.entries(curvedCards)

  return (
    <Row>
      {stacks.map(([ type, cards ]) => <Stack key={`type-${type}`}>
        <StackHeader>{`${type} - ${pluralizer('Card', cards.length, true)}`}</StackHeader>
        {cards.map(card => <StackCard key={card.id} card={card} />)}
      </Stack>)}
    </Row>
  )
}

const Row = styled.div`
  display: flex;
  align-items: flex-start;
  flex-wrap: nowrap;
  overflow-x: auto;
  height: 100%;
  padding: 30px;

`

const Stack = styled.div`
  width: 184px;
  flex: 0 0 184px;
  margin-right: 8px;
  display: flex;
  flex-direction: column;

  &:last-child {
    margin-right: 0;
  }
`

const StackCard = styled(PreviewCard)`
  padding-bottom: calc(680 / 488 * 100%);
  margin-top: -122%;

  &:nth-of-type(2) {
    margin-top: 0;
  }
`

const StackHeader = styled.div`
  font-size: 14px;
  line-height: 18px;
  margin-bottom: 8px;
  width: 100%;
  text-transform: capitalize;
`

const cardTypes = [ 'creature', 'artifact', 'land', 'instant', 'sorcery' ]

function groupCardsByType(cards: Card[]): CurvedCards {
  const typedCards: CurvedCards = {}
  cards.forEach(card => {
    const { type_line } = card
    const type = getType(type_line)
    if (typeof typedCards[`${type}`] === 'undefined') {
      typedCards[`${type}`] = []
    }
    typedCards[`${type}`].push(card)
  })

  return typedCards
}

function getType(line: string): string {
  const majorType = cardTypes.find(type => {
    return line.toLowerCase().includes(type)
  })

  return majorType || 'unknown'
}