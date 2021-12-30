import { CleanedDeck, Deck } from 'types'
import { prisma } from './prisma'

export const addHandleToDeck = async (deck: CleanedDeck): Promise<Deck> => {
  const { creatorId } = deck
  const user = await prisma.user.findUnique({ where: { id: creatorId } })

  if (!user) {
    throw new Error('no user with that id exists')
  }

  return { ...deck, creatorHandle: user.handle }
}
