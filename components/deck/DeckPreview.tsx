import { PreviewCard } from 'components/cards/PreviewCard'
import { CardGrid } from 'components/deck/CardGrid'
import { useCards } from 'components/deck/CardsContext'
import { FC } from 'react'
import styled from 'styled-components'

export const DeckPreview: FC = () => {
  const { cards } = useCards()

  return (
    <Container>
      <CardGrid>
        {cards.map((card) => (
          <PreviewCard key={card.id} card={card} />
        ))}
      </CardGrid>
    </Container>
  )
}

const Container = styled.div`
  flex: 1 0 0;
  overflow: auto;
  padding: 30px;
`
