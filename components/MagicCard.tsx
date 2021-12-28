import { Card } from 'scryfall-sdk'
import {FC} from 'react'
import styled from 'styled-components'

export const MagicCard: FC<Card> = ({image_uris}) => {
  return (
    <Container style={{ backgroundImage: `url(${image_uris?.normal})` }} />
  )
}

const Container = styled.div`
  font-size: 0;
  border-radius: 7px;
  background-color: #ccc;
  margin-bottom: 4px;
  display: flex;
  background-size: cover;

  &:before {
    content: "";
    display: block;
    height: 0;
    width: 0;
    padding-bottom: calc(680 / 488 * 100%);
  }
`
