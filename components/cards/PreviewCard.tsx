import { MagicCard } from 'components/cards/MagicCard'
import { useCards } from 'components/deck/CardsContext'
import { useInspector } from 'contexts'
import { FC } from 'react'
import { Card } from 'scryfall-sdk'
import { Search, X } from 'styled-icons/boxicons-regular'

interface Props {
  card: Card
}

export const PreviewCard: FC<Props> = ({ card }) => {
  const { inspectedCard, inspectCard } = useInspector()
  const { removeCard } = useCards()
  // const { loading } = useDeck()

  const isSelected = !!inspectedCard && inspectedCard.id === card.id

  const menuItems = [
    {
      icon: Search,
      name: 'inspect',
      onClick: inspectCard,
    },
    {
      icon: X,
      name: 'remove',
      onClick: removeCard,
    },
  ]

  return <MagicCard card={card} selected={isSelected} menuItems={menuItems} />
}
