import { Plane } from 'components/deck/Plane'
import { colors, Pip } from 'components/ui'
import { FC } from 'react'
import { Card } from 'scryfall-sdk'
import styled from 'styled-components'
import { LayoutCard, LayoutMode } from 'types'
import { layoutCards, layoutProportions, sliceDeckBy } from 'utils'

interface Props {
  cards: Card[]
  children: (cards: LayoutCard[]) => React.ReactNode
  mode: LayoutMode
}

export const Layout: FC<Props> = ({ children, mode, ...props }) => {
  const deckSlice = sliceDeckBy[mode](props.cards)
  const { board, cards, headings } = layoutCards(deckSlice)

  return (
    <Plane width={board.width} height={board.height}>
      {children(cards)}
      {headings.map((heading) => (
        <Heading
          key={heading.text}
          style={{ top: `${heading.pos.y}px`, left: `${heading.pos.x}px` }}
        >
          <Pip>{heading.count}</Pip>
          <span>{heading.text}</span>
        </Heading>
      ))}
    </Plane>
  )
}

const Heading = styled.div`
  user-select: none;
  position: absolute;
  width: ${layoutProportions.cardSize.width}px;
  height: ${layoutProportions.headingHeight}px;
  font-size: 18px;
  line-height: 24px;
  color: ${colors.n6};
  display: flex;
`
