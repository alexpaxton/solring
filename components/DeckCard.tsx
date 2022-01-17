import { Username } from 'components/Username'
import Link from 'next/link'
import { FC } from 'react'
import styled from 'styled-components'
import { DeckWithHandle } from 'types'

export const DeckCard: FC<DeckWithHandle> = ({
  id,
  title,
  description,
  creator: { handle },
}) => {
  return (
    <Card>
      <Link href={`/decks/${id}`}>
        <CardTitle>{title}</CardTitle>
      </Link>
      {description && <CardDesc>{description}</CardDesc>}
      <Creator>
        <Username>{handle}</Username>
      </Creator>
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
