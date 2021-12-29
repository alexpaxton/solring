import {CleanedDeck} from 'types'
import {Deck as PrismaDeck} from '@prisma/client'

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