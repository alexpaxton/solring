import { Card as BaseCard } from 'components/cards/Card'
import { useInspector } from 'contexts'
import { FC } from 'react'
import { Card } from 'scryfall-sdk'
import { Search } from 'styled-icons/boxicons-regular'

interface Props {
  card: Card
}

export const SearchResultCard: FC<Props> = ({ card }) => {
  const { inspectedCard, inspectCard } = useInspector()

  const isSelected = !!inspectedCard && inspectedCard.id === card.id

  const menuItems = [
    {
      icon: Search,
      name: 'inspect',
      onClick: inspectCard,
    },
  ]

  return <BaseCard card={card} selected={isSelected} menuItems={menuItems} />
}
