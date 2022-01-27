import { Button } from 'components/ui'
import { FC, useState } from 'react'
import { addCards } from 'utils'

interface Props {
  deckTitle: string
  deckId: string
  cardId: string
  cardTitle: string
}

export const AddCardToDeckButton: FC<Props> = ({
  deckTitle,
  deckId,
  cardId,
  cardTitle,
}) => {
  const [loading, setLoading] = useState<boolean>(false)

  async function handleClick() {
    setLoading(true)
    const resp = await addCards({ type: 'deck', cards: [cardId], id: deckId })
    const count = resp.data || 0

    const message =
      count === 0
        ? `${cardTitle} is already in ${deckTitle}`
        : `${cardTitle} added to ${deckTitle}`
    window.alert(message)
    setLoading(false)
  }

  return (
    <Button disabled={loading} onClick={handleClick}>
      {loading ? 'Loading...' : deckTitle}
    </Button>
  )
}
