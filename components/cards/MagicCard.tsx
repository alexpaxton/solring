import { FC } from 'react'
import { Card } from 'scryfall-sdk'
import styled from 'styled-components'

export const MagicCard: FC<Card> = ({
  image_uris, children 
}) => {
  return (
    <Container style={{ backgroundImage: `url(${image_uris?.normal})` }}>{children}</Container>
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
