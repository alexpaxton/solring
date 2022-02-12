import { APICardsData, Deck, DeckRequest, User } from 'types'

type CreateUser = (
  data: { handle: string; email: string },
  callback?: () => void,
) => Promise<User>

export const createUser: CreateUser = async (data, callback) => {
  const resp = await fetch('/api/users/create', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })

  const { newUser } = await resp.json()
  callback && callback()
  return newUser
}

type UpdateDeck = (data: Deck, callback?: () => void) => Promise<DeckRequest>

export const updateDeck: UpdateDeck = async (data, callback) => {
  const resp = await fetch('/api/decks/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 's-maxage=1, stale-while-revalidate=59',
    },
    body: JSON.stringify(data),
  })

  const respData = await resp.json()
  callback && callback()
  return respData
}

export interface AddCardsData {
  type: 'deck'
  id: string
  cards: string[]
}

type AddCards = (
  data: AddCardsData,
  callback?: () => void,
) => Promise<APICardsData>

export const addCards: AddCards = async (data, callback) => {
  const resp = await fetch('/api/cards', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  const respData = await resp.json()
  callback && callback()
  return respData
}
