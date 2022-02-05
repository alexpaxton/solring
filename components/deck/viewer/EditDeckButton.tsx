import { Button } from 'components/ui'
import Link from 'next/link'
import { FC } from 'react'
import { useMe } from 'utils'

interface Props {
  creatorId: string
  deckId: string
}

export const EditDeckButton: FC<Props> = ({ creatorId, deckId }) => {
  const { me, isError } = useMe()

  if (!isError && me && creatorId === me.id) {
    return (
      <Link href={`/decks/${deckId}/edit`}>
        <Button variant="primary">Edit Deck</Button>
      </Link>
    )
  }

  return null
}
