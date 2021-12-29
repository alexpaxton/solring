import { Deck } from 'types'
import {FC} from 'react'
import Link from 'next/link'
import styled from 'styled-components'

export const DeckCard: FC<Deck> = ({id, title, description, creatorHandle}) => {
  return (
    <Card>
      <Link href={`/decks/${id}`}>
        <CardTitle>{title}</CardTitle>
      </Link>
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
  cursor: pointer;
  color: #0000ff;

  &:hover {
    text-decoration: underline;
  }
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