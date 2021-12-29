import {CleanedDeck} from 'types'
import {Deck as PrismaDeck} from '@prisma/client'

export function stringifyDeckTimestamps(decks: PrismaDeck[]): CleanedDeck[] {
  return decks.map((deck) => {
    return {
      ...deck,
      createdAt: deck.createdAt.toString(),
      updatedAt: deck.updatedAt.toString(),
    }
  })
}