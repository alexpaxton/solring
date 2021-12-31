import Link from 'next/link'
import { FC } from 'react'
import styled from 'styled-components'
import { useMe } from 'utils'

interface Props {
  creatorId: string
  deckId: string
}

export const EditDeckButton: FC<Props> = ({
  creatorId, deckId 
}) => {
  const { id } = useMe()

  if (creatorId === id) {
    return (
      <Link href={`/decks/${deckId}/edit`}>
        <Button>Edit Deck</Button>
      </Link>
    )
  }

  return null
}

const Button = styled.button`
  width: 100px;
  height: 40px;
`
