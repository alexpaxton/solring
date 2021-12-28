import { Deck as PrismaDeck } from '@prisma/client'

export interface Deck extends Omit<PrismaDeck, 'createdAt' | 'updatedAt'> {
    createdAt: string
    updatedAt: string
}
