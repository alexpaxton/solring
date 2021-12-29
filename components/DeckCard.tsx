import { Deck } from 'types'
import {FC} from 'react'
import styled from 'styled-components'

export const DeckCard: FC<Deck> = ({title, description, creatorHandle}) => {
  return (
    <Card>
      <CardTitle>{title}</CardTitle>
      {description && <CardDesc>{description}</CardDesc>}
      <Creator>{`@${creatorHandle}`}</Creator>
    </Card>
  )
}

const Card = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #ccc;
  border-radius: 4px;
  padding: 12px;
`

const CardTitle = styled.div`
  font-weight: bold;
  font-size: 16px;
`

const CardDesc = styled.div`
  font-weight: normal;
  font-size: 13px;
`

const Creator = styled.div`
  font-size: 13px;
  margin-top: 8px;
  padding-top: 8px;
  border-top: 1px solid #aaa;
  width: 100%;
`