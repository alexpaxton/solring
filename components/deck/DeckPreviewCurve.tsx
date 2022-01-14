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

export const DeckPreviewCurve: FC = () => {
  const { cards } = useCards()
  const { mode } = useDeck()

  if (mode !== 'curve') {
    return null
  }

  const curvedCards = groupCardsByCost(cards)
  const stacks: Stack[] = Object.entries(curvedCards)

  return (
    <Row>
      {stacks.map(([ cost, cards ]) => <Stack key={`cmc-${cost}`}>
        <StackHeader>{`${cost} - ${pluralizer('Card', cards.length, true)}`}</StackHeader>
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
`

function groupCardsByCost(cards: Card[]): CurvedCards {
  const curvedCards: CurvedCards = {}
  cards.forEach(card => {
    const { cmc } = card
    if (typeof curvedCards[`${cmc}`] === 'undefined') {
      curvedCards[`${cmc}`] = []
    }
    curvedCards[`${cmc}`].push(card)
  })

  return fillInBlanks(curvedCards)
}

function fillInBlanks(cards: CurvedCards): CurvedCards {
  const filledCards = cards
  const sets = Object.keys(filledCards)
  const highest = Number(sets[sets.length - 1])

  for (let x = 0; x <= highest; x++) {
    if (typeof filledCards[`${x}`] === 'undefined') {
      filledCards[`${x}`] = []
    }
  }

  return filledCards
}