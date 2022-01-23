import { Deck as PrismaDeck, User as PrismaUser } from '@prisma/client'
import { CSSProperties } from 'react'

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

export interface DeckWithHandle extends PrismaDeck {
  creator: {
    handle: string
  }
}

export interface DeckRequest {
  deck?: Deck
  error?: string
}

// Filters

export type ColorMode = 'include' | 'exclude' | 'exactly'
export type CMCMode = 'atLeast' | 'atMost' | 'exactly' | 'between'

// API response types
export type APIMeData = {
  data?: Me
  error?: string
}
