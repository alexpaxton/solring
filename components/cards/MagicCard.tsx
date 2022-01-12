import { FC } from 'react'
import { Card } from 'scryfall-sdk'
import styled from 'styled-components'

export const MagicCard: FC<Card> = ({
  image_uris, children, card_faces,
}) => {
  let image = image_uris?.small

  if (card_faces) {
    image = card_faces[0].image_uris?.small
  }

  return (
    <Container style={{ backgroundImage: `url(${image})` }}>{children}</Container>
  )
}

const Container = styled.div`
  font-size: 0;
  border-radius: 5% / 4%;
  display: flex;
  background-size: cover;
  position: relative;
  z-index: 1;
`
