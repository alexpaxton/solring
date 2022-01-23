import { Button } from 'components/ui'
import { FC, useState } from 'react'
import { addCards, pluralizer } from 'utils'

interface Props {
  deckTitle: string
  deckId: string
  cardId: string
}

export const AddCardToDeckButton: FC<Props> = ({
  deckTitle,
  deckId,
  cardId,
}) => {
  const [loading, setLoading] = useState<boolean>(false)

  async function handleClick() {
    setLoading(true)
    const resp = await addCards({ type: 'deck', cards: [cardId], id: deckId })
    const message = `${pluralizer(
      'Card',
      resp.data || 0,
      true,
    )} added to ${deckTitle}`
    window.alert(message)
    setLoading(false)
  }

  return (
    <Button disabled={loading} onClick={handleClick}>
      {deckTitle}
    </Button>
  )
}
