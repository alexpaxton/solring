import { colors } from 'components/ui'
import Image from 'next/image'
import { FC } from 'react'
import { Card as ScryfallCard } from 'scryfall-sdk'
import styled from 'styled-components'
import { StyledIcon } from 'styled-icons/types'
import { StandardProps } from 'types'
import { classnames, linearGradient } from 'utils'

interface CardMenuItem {
  icon: StyledIcon
  name: string
  onClick: (card: ScryfallCard) => void
}

interface Props extends StandardProps {
  highRes?: boolean
  card: ScryfallCard
  menuItems?: CardMenuItem[]
  selected?: boolean
  count?: number
}

export const Card: FC<Props> = ({
  card,
  children,
  highRes,
  menuItems,
  selected = false,
  style,
  className,
  count = 1,
}) => {
  const { image_uris, card_faces } = card
  let image = highRes ? image_uris?.large : image_uris?.normal

  if (card_faces) {
    image = highRes
      ? card_faces[0].image_uris?.large
      : card_faces[0].image_uris?.normal
  }

  const url = image?.split('?')[0] || ''
  const containerClass = classnames(className, {
    selected,
  })

  return (
    <Container style={style} className={containerClass}>
      {count > 1 && <Count>{count}</Count>}
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
      <Image src={url} layout="fill" priority={true} />
    </Container>
  )
}

const Border = styled.div`
  border: 2px solid ${colors.n2};
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 4;
  border-radius: inherit;
  transition: border-color 0.25s ease, background-color 0.25s ease;
  pointer-events: none;

  .selected &,
  .selected:hover & {
    border-color: ${colors.p2};
    box-shadow: 0 2px 4px ${colors.p1}, 0 3px 8px ${colors.p0};
  }
`

const Count = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  background-color: ${colors.n2};
  display: block;
  padding: 6px;
  font-size: 11px;
  font-weight: 600;
  color: #fff;
  border-radius: inherit;
  border-top-left-radius: 0;
  border-bottom-right-radius: 0;
  transition: background-color 0.25s ease;
  z-index: 3;

  .selected &,
  .selected:hover & {
    background-color: ${colors.p2};
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
  z-index: 3;
`

const Container = styled.div`
  width: 100%;
  font-size: 0;
  border-radius: 5% / 4%;
  display: flex;
  position: relative;
  z-index: 1;
  background-color: #000;
  transition: box-shadow 0.25s ease;
  box-shadow: 0 0 5px 2px ${colors.n0};
  user-select: none;
  transform: translate3d(0, 0, 0);
  background: ${linearGradient(45, colors.p0, colors.p2)};

  &:hover ${Border} {
    border-color: ${colors.p1};
  }

  &:hover ${Count} {
    background-color: ${colors.p1};
  }

  &:hover ${Menu}, &.selected ${Menu} {
    opacity: 1;
  }

  &.selected,
  &.selected:hover {
    box-shadow: 0 0 4px ${colors.p1}, 0 0 8px ${colors.p0};
  }

  // Next image
  & > span {
    border-radius: inherit;
    overflow: hidden !important;
    position: relative !important;
    width: 100% !important;
    height: 100% !important;
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
