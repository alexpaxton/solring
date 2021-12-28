import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from 'utils'

export default async function assetHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, body } = req
  
  switch (method) {
  case 'POST':
    try {
      const data = body
      const newDeck = await prisma.deck.create({data})
      res.status(200).json(newDeck)
      return newDeck
    } catch (e) {
      console.error('Request error', e)
      res.status(500).json({ error: 'Error creating deck' })
    }
    break
  default:
    res.setHeader('Allow', ['POST'])
    res.status(405).end(`Method ${method} Not Allowed`)
    break
  }
}
