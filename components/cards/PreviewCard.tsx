import { MagicCard } from 'components/cards/MagicCard'
import { useCards } from 'components/deck/CardsContext'
import { useDeck } from 'components/deck/DeckContext'
import { FC } from 'react'
import { Card } from 'scryfall-sdk'
import styled from 'styled-components'

interface Props {
  card: Card
}

export const PreviewCard: FC<Props> = ({ card }) => {
  const { removeCard } = useCards()
  const { loading } = useDeck()

  function handleClick() {
    removeCard(card)
  }

  return (
    <MagicCard {...card}>
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
`
