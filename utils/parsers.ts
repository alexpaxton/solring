import {Deck} from 'types'
import {Deck as PrismaDeck} from '@prisma/client'

export function stringifyDeckTimestamps(decks: PrismaDeck[]): Deck[] {
  return decks.map(deck => {
    return {
      ...deck,
      createdAt: deck.createdAt.toString(),
      updatedAt: deck.updatedAt.toString(),
    }
  })
}