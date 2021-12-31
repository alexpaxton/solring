import { Card } from 'scryfall-sdk'
import { FC } from 'react'
import styled from 'styled-components'

export const MagicCard: FC<Card> = ({ image_uris }) => {
  return (
    <Container style={{ backgroundImage: `url(${image_uris?.normal})` }} />
  )
}

const Container = styled.div`
  font-size: 0;
  border-radius: 5% / 4%;
  display: flex;
  background-size: cover;
`
