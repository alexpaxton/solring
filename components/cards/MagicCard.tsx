import { colors } from 'components/ui'
import { FC } from 'react'
import { Card } from 'scryfall-sdk'
import styled from 'styled-components'
import { StyledIcon } from 'styled-icons/types'
import { StandardProps } from 'types'
import { classnames } from 'utils'

interface CardMenuItem {
  icon: StyledIcon
  name: string
  onClick: (card: Card) => void
}

interface Props extends StandardProps {
  highRes?: boolean
  card: Card
  menuItems?: CardMenuItem[]
  selected?: boolean
}

export const MagicCard: FC<Props> = ({
  card,
  children,
  highRes,
  menuItems,
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
    selected,
  })

  return (
    <Container
      style={{ ...style, backgroundImage: `url(${url})` }}
      className={containerClass}
    >
      <Border />
      {menuItems && (
        <Menu>
          {menuItems.map((item) => (
            <MenuButton
              key={`${card.id}${item.name}`}
              onClick={() => item.onClick(card)}
            >
              <item.icon />
            </MenuButton>
          ))}
        </Menu>
      )}
      {children}
    </Container>
  )
}

const Border = styled.div`
  border: 2px solid transparent;
  width: 100%;
  height: 100%;
  border-radius: 5% / 4%;
  transition: border-color 0.25s ease, background-color 0.25s ease;

  .selected &,
  .selected:hover & {
    border-color: ${colors.p2};
    box-shadow: 0 2px 4px ${colors.p1}, 0 3px 8px ${colors.p0};
  }
`

const Menu = styled.div`
  position: absolute;
  top: 24%;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.25s ease;
`

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

  &:hover ${Border} {
    border-color: ${colors.p1};
  }

  &:hover ${Menu}, &.selected ${Menu} {
    opacity: 1;
  }

  &.selected,
  &.selected:hover {
    box-shadow: 0 0 4px ${colors.p1}, 0 0 8px ${colors.p0};
  }
`

const MenuButton = styled.div`
  width: 32px;
  height: 32px;
  background-color: ${colors.n0};
  border: 2px solid ${colors.p1};
  border-radius: 5px;
  margin: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.25s ease;

  > svg {
    fill: ${colors.n7};
    width: 1em;
    height: 1em;
    font-size: 22px;
  }

  &:hover {
    background-color: ${colors.p1};
  }
`
