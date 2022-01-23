import { MagicCard } from 'components/cards/MagicCard'
import { useFocusedCard } from 'contexts'
import { FC } from 'react'
import { Card } from 'scryfall-sdk'
import styled from 'styled-components'

interface Props {
  card: Card
}

export const SearchResultCard: FC<Props> = ({ card }) => {
  const { focusedCard, setFocusedCard } = useFocusedCard()

  const isFocused = focusedCard && focusedCard.id === card.id

  function handleClick() {
    isFocused ? setFocusedCard(null) : setFocusedCard(card)
  }

  return (
    <MagicCard {...card}>
      <ClickArea
        className={isFocused ? 'focused' : undefined}
        onClick={handleClick}
      />
    </MagicCard>
  )
}

const ClickArea = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  border: 2px solid #ff0000;
  opacity: 0;
  cursor: pointer;

  &.focused {
    opacity: 1;
  }
`
