import { Card as BaseCard } from 'components/cards/Card'
import { useCards } from 'components/deck/CardsContext'
import { useInspector } from 'contexts'
import { FC } from 'react'
import { Card } from 'scryfall-sdk'
import styled from 'styled-components'
import { Search, X } from 'styled-icons/boxicons-regular'
import { layoutProportions } from 'utils'

interface Props {
  card: Card
  x: number
  y: number
  z: number
}

export const EditorCard: FC<Props> = ({ card, x, y, z }) => {
  const { inspectedCard, inspectCard } = useInspector()
  const { removeCard } = useCards()
  // const { loading } = useDeckEditor()

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

  return (
    <StyledCard
      card={card}
      selected={isSelected}
      menuItems={menuItems}
      style={{
        top: `${y}px`,
        left: `${x}px`,
        zIndex: z,
      }}
    />
  )
}

const StyledCard = styled(BaseCard)`
  position: absolute;
  width: ${layoutProportions.cardSize.width}px;
  height: ${layoutProportions.cardSize.height}px;
  border-radius: 9px;
  transition: top 0.4s cubic-bezier(0, 0.55, 0.45, 1),
    left 0.4s cubic-bezier(0, 0.55, 0.45, 1);

  &:hover {
    z-index: 100 !important;
  }
`
