import {CleanedDeck, User} from 'types'
import {Deck as PrismaDeck, User as PrismaUser} from '@prisma/client'

export function stringifyDecksTimestamps(decks: PrismaDeck[]): CleanedDeck[] {
  return decks.map(stringifyDeckTimestamps)
}

export function stringifyDeckTimestamps(deck: PrismaDeck): CleanedDeck {
  return {
    ...deck,
    createdAt: deck.createdAt.toString(),
    updatedAt: deck.updatedAt.toString(),
  }
}

export function stringifyUserTimestamps(user: PrismaUser): User {
  return {
    ...user,
    createdAt: user.createdAt.toString(),
  }
}
