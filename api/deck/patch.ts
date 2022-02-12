import { prisma } from 'data_utils'
import { DeckPatchBody, DeckPatchResponse, NextRouteWithUser } from 'types'

export type HandleDeckPatch = NextRouteWithUser<
  DeckPatchBody,
  DeckPatchResponse
>

export const handleDeckPatch: HandleDeckPatch = async (req, res) => {
  const { body, user } = req

  if (!user) {
    return res.status(401).json({ error: 'No user is authorized' })
  }

  if (!body.id) {
    return res.status(401).json({ error: 'No deck ID found in request' })
  }

  if (!user.decks.find((deck) => deck.id === body.id)) {
    return res.status(401).json({
      error: 'User does not have permission to update deck with that ID',
    })
  }

  const updatedDeck = await prisma.deck.update({
    where: { id: body.id },
    data: { ...body },
  })

  if (updatedDeck) {
    return res.status(200).json({ data: 'Deck updated successfully' })
  }

  return res.status(500).json({ error: 'Failed to delete deck' })
}
