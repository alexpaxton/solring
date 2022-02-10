import { prisma } from 'data_utils'
import { DeckDeleteBody, DeckDeleteResponse, NextRouteWithUser } from 'types'

export type HandleDeckDelete = NextRouteWithUser<
  DeckDeleteBody,
  DeckDeleteResponse
>

export const handleDeckDelete: HandleDeckDelete = async (req, res) => {
  const { body, user } = req

  if (!user) {
    return res.status(401).json({ error: 'No user is authorized' })
  }

  if (!user.decks.find((deck) => deck.id === body.id)) {
    return res
      .status(401)
      .json({
        error: 'User does not have permission to delete deck with that ID',
      })
  }

  const deleteDeck = await prisma.deck.delete({ where: { id: body.id } })

  if (deleteDeck) {
    return res.status(204).json({ data: 'Deck deleted successfully' })
  }

  return res.status(500).json({ error: 'Failed to delete deck' })
}
