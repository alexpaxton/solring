import { prisma } from 'data_utils'
import { DeckGetResponse, DeckWithHandle, NextRouteWithUser } from 'types'

export type HandleDeckGet = NextRouteWithUser<null, DeckGetResponse>

export const handleDeckGet: HandleDeckGet = async (req, res) => {
  const query = req.query
  console.log('query', query)
  const creatorId = getCreatorIdFromQuery(query)
  console.log('creatorId', creatorId)

  let decks: DeckWithHandle[] = []

  if (creatorId) {
    decks = await prisma.deck.findMany({
      where: { creatorId },
      include: { creator: { select: { handle: true } } },
    })
  } else {
    decks = await prisma.deck.findMany({
      include: { creator: { select: { handle: true } } },
    })
  }

  return res.status(200).json({ data: decks })
}

/** Returns a single creatorId or null */
function getCreatorIdFromQuery(
  query: Record<string, string | string[]>,
): string | null {
  if ('creatorId' in query === false) {
    return null
  }

  const ids = query.creatorId

  if (typeof ids === 'object' && ids.length) {
    return ids[0]
  } else if (typeof ids === 'string') {
    return ids
  }

  return null
}
