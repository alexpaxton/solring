import { MagicCard } from 'components/cards/MagicCard'
import { useCards } from 'components/deck/CardsContext'
import { useDeck } from 'components/deck/DeckContext'
import { FC } from 'react'
import { Card } from 'scryfall-sdk'
import styled from 'styled-components'

interface Props {
  card: Card
  className?: string
}

export const PreviewCard: FC<Props> = ({
  card, className 
}) => {
  const { removeCard } = useCards()
  const { loading } = useDeck()

  function handleClick() {
    removeCard(card)
  }

  console.log('card', card)
  return (
    <MagicCard {...card} className={className}>
      {!loading && <DeleteButton onClick={handleClick}>X</DeleteButton>}
    </MagicCard>
  )
}

const DeleteButton = styled.button`
  position: absolute;
  top: 5px;
  right: 5px;
  width: 30px;
  height: 30px;
  border: 0;
  background-color: #000;
  color: #fff;
  font-size: 14px;
  opacity: 0;

  .magic-card:hover & {
    opacity: 1;
  }
`