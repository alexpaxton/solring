import { ListSection } from 'components/deck/ListSection'
import { FC } from 'react'
import { Card } from 'scryfall-sdk'
import styled from 'styled-components'
import { LayoutMode } from 'types'
import { sliceDeckBy } from 'utils'

interface Props {
  cards: Card[]
  mode: LayoutMode
}

export const List: FC<Props> = ({ mode, ...props }) => {
  const deckSlice = sliceDeckBy[mode](props.cards)
  const slices = Object.entries(deckSlice)

  return (
    <Container>
      {slices.map((slice) => (
        <ListSection key={slice[0]} title={slice[0]} cards={slice[1]} />
      ))}
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  flex: 1 0 0;
  position: relative;
  overflow-x: hidden;
  overflow-y: auto;
  transform: translate3d(0, 0, 0);
  padding: 30px;
  display: flex;
  flex-wrap: wrap;
`
