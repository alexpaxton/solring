import { CleanedDeck, Deck } from 'types'
import { PrismaClient } from '@prisma/client'

export const prisma: PrismaClient = new PrismaClient()

// if (process.env.NODE_ENV === 'development') global.prisma = prisma

// Put this somewhere else. Keep running into issue where you can't import prisma client into frontend code
export const addHandleToDeck = async (deck: CleanedDeck): Promise<Deck> => {
  const { creatorId } = deck
  const user = await prisma.user.findUnique({ where: { id: creatorId } })

  if (!user) {
    throw new Error('no user with that id exists')
  }

  return { ...deck, creatorHandle: user.handle }
}