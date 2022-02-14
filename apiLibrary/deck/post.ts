import { prisma } from 'data_utils'
import { Deck, DeckPostBody, DeckPostResponse, NextRouteWithUser } from 'types'

export type HandleDeckPost = NextRouteWithUser<DeckPostBody, DeckPostResponse>

export const handleDeckPost: HandleDeckPost = async (req, res) => {
  const { user, body } = req

  if (!user) {
    res.status(401).json({ error: 'Must be authenticated to create a deck' })
    return
  }

  const draftDeck = {
    ...body,
    creatorId: user.id,
    cards: [],
  }

  const newDeck = (await prisma.deck.create({ data: draftDeck })) as Deck
  res.status(201).json({ data: newDeck })
  return
}
