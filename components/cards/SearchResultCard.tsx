import { MagicCard } from 'components/cards/MagicCard'
import { useFocusedCard } from 'contexts'
import { FC } from 'react'
import { Card } from 'scryfall-sdk'

interface Props {
  card: Card
}

export const SearchResultCard: FC<Props> = ({ card }) => {
  const { focusedCard, setFocusedCard } = useFocusedCard()

  const isSelected = !!focusedCard && focusedCard.id === card.id

  function handleClick() {
    isSelected ? setFocusedCard(null) : setFocusedCard(card)
  }

  return <MagicCard card={card} selected={isSelected} onClick={handleClick} />
}
