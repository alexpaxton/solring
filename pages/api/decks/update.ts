import { getSession } from '@auth0/nextjs-auth0'
import { prisma } from 'data_utils'
import {
  NextApiRequest, NextApiResponse
} from 'next'
import { DeckWithHandle } from 'types'

export default async function assetHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req

  const deck = req.body as DeckWithHandle
  
  switch (method) {
  case 'POST':
    try {
      const session = await getSession(req, res)

      if (!session) {
        res.status(500).json({ error: 'No session' })
        return
      }

      const sessionUser = session.user
      const user = await prisma.user.findUnique(
        { where: { email: sessionUser.email } }
      )

      if (!user) {
        res.status(500).json({ error: 'Error fetching user' })
        return
      }

      if (user.email !== sessionUser.email) {
        res.status(401).json({ error: 'Not allowed to edit this deck' })
        return
      }

      const updatedDeck = await prisma.deck.update({
        where: { id: deck.id },
        data: {
          updatedAt: new Date(Date.now()),
          title: deck.title,
          description: deck.description,
        }
      })
      res.status(200).json({ deck: updatedDeck })
    } catch (e) {
      console.error('Request error', e)
      res.status(500).json({ error: 'Error creating deck' })
    }
    break
  default:
    res.setHeader('Allow', [ 'POST' ])
    res.status(405).end(`Method ${method} Not Allowed`)
    break
  }
}
