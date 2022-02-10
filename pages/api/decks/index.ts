import { prisma } from 'data_utils'
import { withUser } from 'middleware/api'
import { DeckPostBody, NextRouteWithUser } from 'types'

const handleDecks: NextRouteWithUser = async (req, res) => {
  const { method, user } = req

  switch (method) {
    case 'POST':
      try {
        const body = req.body as DeckPostBody

        const data = {
          ...body,
          creatorId: user.id,
          cards: [],
        }

        const deck = await prisma.deck.create({ data })

        res.status(200).json({ deck })
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

export default withUser(handleDecks)
