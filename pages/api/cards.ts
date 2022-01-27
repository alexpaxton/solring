import { prisma } from 'data_utils'
import { withUser } from 'middleware/api'
import { AddCardsData, Deck, NextRouteWithUser } from 'types'
import { dedupe } from 'utils'

const handleCards: NextRouteWithUser = async (req, res) => {
  const { method, user } = req
  const data = req.body as AddCardsData

  switch (method) {
    case 'PATCH':
      try {
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

        if (!user.decks.find((d) => d.id === data.id)) {
          res
            .status(401)
            .json({ error: 'User does not permission to update this deck' })
        }

        const cards = dedupe<string>([...deck.cards, ...data.cards])
        await prisma.deck.update({
          where: { id: deck.id },
          data: {
            updatedAt: new Date(Date.now()),
            cards,
          },
        })

        const cardsAdded = cards.length - deck.cards.length

        res.status(200).json({ data: cardsAdded })
      } catch (e) {
        console.error(e)
        res.status(500).json({ error: 'Error fetching me' })
      }
      break
    default:
      res.setHeader('Allow', ['PATCH'])
      res.status(405).end(`Method ${method} not allowed`)
      break
  }
}

export default withUser(handleCards)
