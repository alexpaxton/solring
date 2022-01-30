import { AddCardToDeckButton } from 'components/gatherer/AddCardToDeckButton'
import { colors } from 'components/ui'
import { useInspector } from 'contexts'
import { FC } from 'react'
import styled from 'styled-components'
import { rgba, useMe } from 'utils'

export const InspectorActions: FC = () => {
  const { inspectedCard } = useInspector()
  const { me, isError } = useMe()

  if (inspectedCard === null || !me || isError) {
    return null
  }

  return (
    <Actions>
      <p>Add card to:</p>
      {me.decks.map((deck) => (
        <AddCardToDeckButton
          key={`add-to_${deck.id}`}
          deckId={deck.id}
          deckTitle={deck.title}
          cardId={inspectedCard.id}
          cardTitle={inspectedCard.name}
        />
      ))}
    </Actions>
  )
}

const Actions = styled.div`
  display: flex;
  flex-direction: column;
  border-top: 2px solid ${rgba(colors.n7, 0.25)};
  padding-top: 16px;
  text-align: center;
  margin-top: 20px;

  > * {
    margin-bottom: 4px;
  }

  p {
    margin: 0 0 16px 0;
  }
`
