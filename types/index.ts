import { UserProfile } from '@auth0/nextjs-auth0'
import {
  Deck as PrismaDeck, User as PrismaUser
} from '@prisma/client'

export type User = PrismaUser

export interface Me {
  id?: string;
  handle?: string;
  user?: UserProfile;
  error?: Error;
  isLoading: boolean;
}

export interface Deck extends Omit<PrismaDeck, 'cards'> {
  cards: string[]
}

export interface DeckWithHandle extends PrismaDeck {
  creator: {
    handle: string;
  };
}

export interface DeckRequest {
  deck?: Deck
  error?: string
}

// Filters

export type ColorMode = 'include' | 'exclude' | 'exactly'
export type CMCMode = 'atLeast' | 'atMost' | 'exactly' | 'between'
 