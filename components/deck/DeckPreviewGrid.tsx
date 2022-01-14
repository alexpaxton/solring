import { PreviewCard } from 'components/cards/PreviewCard'
import { CardGrid } from 'components/deck/CardGrid'
import { useCards } from 'components/deck/CardsContext'
import { useDeck } from 'components/deck/DeckContext'
import { FC } from 'react'

export const DeckPreviewGrid: FC = () => {
  const { cards } = useCards()
  const { mode } = useDeck()

  if (mode !== 'grid') {
    return null
  }

  return (
    <CardGrid>
      {cards.map(card => <PreviewCard key={card.id} card={card} />)}
    </CardGrid>
  )
}