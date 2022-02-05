import { Plane } from 'components/deck/Plane'
import { colors } from 'components/ui'
import { FC } from 'react'
import { Card } from 'scryfall-sdk'
import styled from 'styled-components'
import { LayoutCard, LayoutMode } from 'types'
import { layoutCards, layoutProportions, sliceDeck } from 'utils'

interface Props {
  cards: Card[]
  children: (cards: LayoutCard[]) => React.ReactNode
  mode: LayoutMode
}

export const Layout: FC<Props> = ({ children, mode, ...props }) => {
  const deckSlice = sliceDeck(mode, props.cards)
  const { board, cards, headings } = layoutCards(deckSlice)

  return (
    <Plane width={board.width} height={board.height}>
      {children(cards)}
      {headings.map((heading) => (
        <Heading
          key={heading.text}
          style={{ top: `${heading.pos.y}px`, left: `${heading.pos.x}px` }}
        >
          <span>{heading.text}</span>
          <Pip>{heading.count}</Pip>
        </Heading>
      ))}
    </Plane>
  )
}

const Heading = styled.div`
  position: absolute;
  width: ${layoutProportions.cardSize.width}px;
  height: ${layoutProportions.headingHeight}px;
  font-size: 18px;
  line-height: 24px;
  color: ${colors.n6};
`

const Pip = styled.span`
  display: inline-flex;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  align-items: center;
  justify-content: center;
  background-color: ${colors.n1};
  margin-left: 10px;
  font-size: 14px;
  font-weight: 600;
  color: ${colors.n4};
`
