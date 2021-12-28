import { Deck as PrismaDeck } from '@prisma/client'
import { UserProfile } from '@auth0/nextjs-auth0'

export interface Deck extends Omit<PrismaDeck, 'createdAt' | 'updatedAt'> {
    createdAt: string
    updatedAt: string
}

export interface Me {
  id?: string;
  handle?: string;
  user?: UserProfile;
  error?: Error;
  isLoading: boolean;
}