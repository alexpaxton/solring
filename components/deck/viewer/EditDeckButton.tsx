import { useDeckViewer } from 'components/deck/viewer/ViewerContext'
import { Button } from 'components/ui'
import Link from 'next/link'
import { FC } from 'react'
import { useMe } from 'utils'

export const EditDeckButton: FC = () => {
  const { me, isError } = useMe()
  const { deckId, creatorId } = useDeckViewer()

  if (!isError && me && creatorId === me.id) {
    return (
      <Link href={`/decks/${deckId}/edit`}>
        <Button variant="primary">Edit Deck</Button>
      </Link>
    )
  }

  return null
}
