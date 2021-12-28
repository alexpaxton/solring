import { NextApiRequest, NextApiResponse } from 'next'
import {prisma} from 'utils/prisma'

export default async function assetHandler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req

  switch (method) {
  case 'GET':
    try {
      const decks = await prisma.deck.findMany()
      res.status(200).json(decks)
    } catch (e) {
      console.error('Request error', e)
      res.status(500).json({ error: 'Error fetching decks' })
    }
    break
  default:
    res.setHeader('Allow', ['GET'])
    res.status(405).end(`Method ${method} Not Allowed`)
    break
  }
}
