import { Deck as PrismaDeck, User as PrismaUser } from '@prisma/client'
import { UserProfile } from '@auth0/nextjs-auth0'

export type User = PrismaUser

export interface Me {
  id?: string;
  handle?: string;
  user?: UserProfile;
  error?: Error;
  isLoading: boolean;
}

export type Deck = PrismaDeck

export interface DeckWithHandle extends PrismaDeck {
  creator: {
    handle: string;
  };
}
