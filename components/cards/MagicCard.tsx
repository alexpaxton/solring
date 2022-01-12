import { FC } from 'react'
import { Card } from 'scryfall-sdk'
import styled from 'styled-components'

interface Props extends Card {
  highRes?: boolean
  className?: string
}

export const MagicCard: FC<Props> = ({
  image_uris, children, card_faces, highRes, className
}) => {
  let image = highRes ? image_uris?.large : image_uris?.small

  if (card_faces) {
    image = highRes ? card_faces[0].image_uris?.large : card_faces[0].image_uris?.small
  }

  const split = image?.split('?')[0]

  return (
    <Container style={{ backgroundImage: `url(${split})` }} className={className}>{children}</Container>
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
`
