import { getSession } from '@auth0/nextjs-auth0'
import { prisma } from 'data_utils'
import type { NextApiRequest, NextApiResponse } from 'next'
import { APIMeData } from 'types'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<APIMeData>,
) {
  const { method } = req

  switch (method) {
    case 'GET':
      try {
        const session = await getSession(req, res)

        if (!session) {
          res.status(401).json({ error: 'No session' })
          return
        }

        const sessionUser = session.user
        const user = await prisma.user.findUnique({
          where: { email: sessionUser.email },
          include: { decks: { select: { id: true, title: true } } },
        })

        if (!user) {
          res.status(401).json({ error: 'No user with that email exists' })
          return
        }

        res.status(200).json({
          data: user,
        })
      } catch (e) {
        console.error(e)
        res.status(500).json({ error: 'Error fetching me' })
      }
      break
    default:
      res.setHeader('Allow', ['GET'])
      res.status(405).end(`Method ${method} not allowed`)
      break
  }
}
