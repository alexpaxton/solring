import { getSession } from '@auth0/nextjs-auth0'
import { prisma } from 'data_utils'
import type { NextApiRequest, NextApiResponse } from 'next'
import { AddCardsData, APICardsData, Deck } from 'types'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<APICardsData>,
) {
  const { method } = req
  const data = req.body as AddCardsData

  switch (method) {
    case 'PUT':
      try {
        const session = await getSession(req, res)

        if (!session) {
          res.status(401).json({ error: 'No session' })
          return
        }

        // TODO:
        // Check data.type to determine which type of entry to update
        // deck or pile
        const deck = (await prisma.deck.findUnique({
          where: { id: data.id },
        })) as Deck
        if (!deck) {
          res.status(500).json({ error: 'No deck with that id exists' })
          return
        }

        await prisma.deck.update({
          where: { id: deck.id },
          data: {
            updatedAt: new Date(Date.now()),
            cards: [...deck.cards, ...data.cards],
          },
        })

        res.status(200).json({ data: data.cards.length })
      } catch (e) {
        console.error(e)
        res.status(500).json({ error: 'Error fetching me' })
      }
      break
    default:
      res.setHeader('Allow', ['PUT'])
      res.status(405).end(`Method ${method} not allowed`)
      break
  }
}
