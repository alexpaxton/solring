import { prisma } from 'data_utils'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function assetHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method, body } = req

  switch (method) {
    case 'POST':
      try {
        const { email, handle } = body
        const user = await prisma.user.findUnique({ where: { email } })
        if (user && user.handle !== '') {
          res.status(500).json({ error: 'User has already chosen a handle' })
        } else if (user && !user.handle) {
          const updatedUser = await prisma.user.update({
            where: { email },
            data: { handle },
          })
          res.status(200).json({ updatedUser })
        } else {
          const newUser = await prisma.user.create({
            data: {
              email,
              handle,
            },
          })
          res.status(200).json({ newUser })
        }
        // res.status(200).json(decks)
      } catch (e) {
        console.error('Request error', e)
        res.status(500).json({ error: 'Error creating user' })
      }
      break
    default:
      res.setHeader('Allow', ['GET'])
      res.status(405).end(`Method ${method} Not Allowed`)
      break
  }
}
