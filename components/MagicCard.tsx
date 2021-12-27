import { Card } from 'scryfall-sdk'
import {FC} from 'react'
import styled from 'styled-components'

export const MagicCard: FC<Card> = ({image_uris}) => {
  return (
    <Container>
      {image_uris && <img src={image_uris?.normal}/>}
    </Container>
  )
}

const Container = styled.div`
  font-size: 0;
  border-radius: 7px;
  background-color: #ccc;
  margin-bottom: 4px;
  overflow: hidden;

  img {
    width: 164px;
  }
`
