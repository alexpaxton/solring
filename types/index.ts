import { Deck as PrismaDeck, User as PrismaUser } from '@prisma/client'
import { UserProfile } from '@auth0/nextjs-auth0'

export interface CleanedDeck extends Omit<PrismaDeck, 'createdAt' | 'updatedAt'> {
    createdAt: string
    updatedAt: string
}

export interface Deck extends CleanedDeck {
  creatorHandle: string
}

export interface User
  extends Omit<PrismaUser, 'createdAt'> {
  createdAt: string;
}

export interface Me {
  id?: string;
  handle?: string;
  user?: UserProfile;
  error?: Error;
  isLoading: boolean;
}
