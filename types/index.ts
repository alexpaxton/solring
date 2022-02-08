import { Deck as PrismaDeck, User as PrismaUser } from '@prisma/client'
import { CSSProperties } from 'react'

export * from './editor'
export * from './gatherer'
export * from './http'

export interface StandardProps {
  className?: string
  style?: CSSProperties
}

export type User = PrismaUser

interface DeckLite {
  id: string
  title: string
}

export interface Me extends PrismaUser {
  decks: DeckLite[]
}

export interface Deck extends Omit<PrismaDeck, 'cards'> {
  cards: string[]
}

export interface DraftDeck {
  title: string
  description: string
}

export interface DeckWithHandle extends PrismaDeck {
  creator: {
    handle: string
  }
}

export interface DeckRequest {
  deck?: Deck
  error?: string
}

// API Response Types
export interface APIMeData {
  data?: Me
  error?: string
}

export interface APICardsData {
  data?: number
  error?: string
}

// API Request Types
export interface AddCardsData {
  type: 'deck'
  id: string
  cards: string[]
}

export interface CardId {
  name: string
}
