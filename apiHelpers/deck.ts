import { DeckGetResponse } from 'types'

// api/deck/GET helper
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

  const response = await fetch(url, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })

  const data: DeckGetResponse = await response.json()
  return data
}
