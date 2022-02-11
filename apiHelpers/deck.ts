import useSWR, { Fetcher } from 'swr'
import {
  DeckDeleteBody,
  DeckDeleteResponse,
  DeckGetResponse,
  DeckPatchBody,
  DeckPatchResponse,
  DeckPostBody,
  DeckPostResponse,
  DeckWithHandle,
} from 'types'

const fetchDecksWithHandles: Fetcher<DeckWithHandle[], string> = (url) =>
  fetch(url).then((res) => res.json())

// api/deck GET helper
export const getDecks = async ({
  creatorId,
}: {
  creatorId?: string
}): Promise<DeckGetResponse> => {
  const params = creatorId ? new URLSearchParams({ creatorId }).toString() : ''
  let url = '/api/deck'

  if (params) {
    url = `${url}?${params}`
  }

  const { data, error } = useSWR(url, fetchDecksWithHandles)

  return { data, error }
}

// api/deck POST helper
export const createDeck = async ({
  title,
  description,
}: DeckPostBody): Promise<DeckPostResponse> => {
  const resp = await fetch('/api/deck', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, description }),
  })

  const data: DeckPostResponse = await resp.json()
  return data
}

// api/deck PATCH helper
export const updateDeck = async ({
  id,
  title,
  cards,
  description,
}: DeckPatchBody): Promise<DeckPatchResponse> => {
  const resp = await fetch('/api/deck', {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, title, description, cards }),
  })

  const data: DeckPatchResponse = await resp.json()
  return data
}

// api/deck DELETE helper
export const deleteDeck = async ({
  id,
}: DeckDeleteBody): Promise<DeckDeleteResponse> => {
  const resp = await fetch('/api/deck', {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id }),
  })

  const data: DeckDeleteResponse = await resp.json()
  return data
}
