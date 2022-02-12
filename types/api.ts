import { HTTPMethod, NextRouteWithUser } from './http'
import { Deck, DeckWithHandle } from './index'

export type APIDictionary<T = NextRouteWithUser<any>> = Record<HTTPMethod, T>

// api/deck POST
export interface DeckPostBody {
  title: string
  description: string
}

export interface DeckPostResponse {
  data?: Deck
  error?: string
}

// api/deck GET
export interface DeckGetResponse {
  data?: DeckWithHandle[]
  error?: string
}

// api/deck DELETE
export interface DeckDeleteBody {
  id: string
}

export interface DeckDeleteResponse {
  data?: string
  error?: string
}

// api/deck PATCH
export interface DeckPatchBody {
  id: string
  title?: string
  description?: string
  cards?: string[]
}

export interface DeckPatchResponse {
  data?: string
  error?: string
}
