import { colors } from 'components/ui'
import { FC } from 'react'
import { Card } from 'scryfall-sdk'
import styled from 'styled-components'
import { StandardProps } from 'types'
import { classnames } from 'utils'

interface Props extends StandardProps {
  highRes?: boolean
  card: Card
  onClick?: (card: Card) => void
  selected?: boolean
}

export const MagicCard: FC<Props> = ({
  card,
  children,
  highRes,
  onClick,
  selected = false,
  style,
  className,
}) => {
  const { image_uris, card_faces } = card
  let image = highRes ? image_uris?.large : image_uris?.small

  if (card_faces) {
    image = highRes
      ? card_faces[0].image_uris?.large
      : card_faces[0].image_uris?.small
  }

  const url = image?.split('?')[0]
  const containerClass = classnames(className, {
    clickable: !!onClick,
    selected,
  })

  function handleClick() {
    onClick && onClick(card)
  }

  return (
    <Container
      style={{ ...style, backgroundImage: `url(${url})` }}
      className={containerClass}
      onClick={handleClick}
    >
      <Border />
      {children}
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  font-size: 0;
  border-radius: 5% / 4%;
  display: flex;
  background-size: cover;
  position: relative;
  z-index: 1;
  background-color: #000;
  transition: box-shadow 0.25s ease;

  &.clickable {
    cursor: pointer;
  }

  &.selected,
  &.selected:hover {
    box-shadow: 0 0 4px ${colors.p1}, 0 0 8px ${colors.p0};
  }
`

const Border = styled.div`
  border: 2px solid transparent;
  width: 100%;
  height: 100%;
  border-radius: 5% / 4%;
  transition: border-color 0.25s ease, background-color 0.25s ease;

  .clickable:hover & {
    border-color: ${colors.p1};
  }

  .selected &,
  .selected:hover & {
    border-color: ${colors.p2};
    box-shadow: 0 2px 4px ${colors.p1}, 0 3px 8px ${colors.p0};
  }
`
