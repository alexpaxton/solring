import { DeckCard } from 'components/DeckCard'
import { FC } from 'react'
import styled from 'styled-components'
import { DeckWithHandle } from 'types'

interface Props {
  decks?: DeckWithHandle[]
}

export const DeckGrid: FC<Props> = ({ decks }) => {
  if (!decks) {
    return null
  }

  return (
    <Grid>
      {decks.map((deck) => (
        <DeckCard key={deck.id} {...deck} />
      ))}
    </Grid>
  )
}

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-auto-rows: 1fr;
  grid-gap: 8px;

  &:before {
    content: '';
    width: 0;
    padding-bottom: 70%;
    grid-row: 1 / 1;
    grid-column: 1 / 1;
  }

  & > *:first-child {
    grid-row: 1 / 1;
    grid-column: 1 / 1;
  }
`
