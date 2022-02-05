import { CardGrid } from 'components/deck/CardGrid'
import { useCards } from 'components/deck/editor/CardsContext'
import { EditorCard } from 'components/deck/editor/EditorCard'
import { FC } from 'react'
import styled from 'styled-components'

export const DeckPreview: FC = () => {
  const { cards } = useCards()

  return (
    <Container>
      <CardGrid>
        {cards.map((card) => (
          <EditorCard key={card.id} card={card} />
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
