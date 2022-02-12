import { prisma } from 'data_utils'
import { withUser } from 'middleware/api'
import { AddCardsData, Deck, NextRouteWithUser } from 'types'
import { dedupe } from 'utils'

const handleCards: NextRouteWithUser<AddCardsData> = async (req, res) => {
  const { method, user, body } = req

  switch (method) {
    case 'PATCH':
      try {
        if (user === null) {
          res.status(401).json({ error: 'User not authorized' })
          return
        }
        // TODO:
        // Check data.type to determine which type of entry to update
        // deck or pile
        const deck = (await prisma.deck.findUnique({
          where: { id: body.id },
        })) as Deck

        if (!deck) {
          res.status(500).json({ error: 'No deck with that id exists' })
          return
        }

        if (!user.decks.find((d) => d.id === body.id)) {
          res
            .status(401)
            .json({ error: 'User does not permission to update this deck' })
          return
        }

        const cards = dedupe<string>([...deck.cards, ...body.cards])
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
