import { prisma } from 'data_utils'
import {
  NextApiRequest, NextApiResponse
} from 'next'

export default async function assetHandler(
  req: NextApiRequest, res: NextApiResponse) {
  const { method } = req

  res.setHeader(
    'Content-Type',
    'application/json'
  )

  res.setHeader(
    'Cache-Control',
    's-maxage=1, stale-while-revalidate=59'
  )

  switch (method) {
  case 'GET':
    try {
      const decks = await prisma.deck.findMany({ include: { creator: { select: { handle: true } } } })
      res.status(200).json(decks)
    } catch (e) {
      console.error('Request error', e)
      res.status(500).json({ error: 'Error fetching decks' })
    }
    break
  default:
    res.setHeader('Allow', [ 'GET' ])
    res.status(405).end(`Method ${method} Not Allowed`)
    break
  }
}
