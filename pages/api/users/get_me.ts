import { getSession } from '@auth0/nextjs-auth0'
import { prisma } from 'data_utils'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function assetHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method } = req

  switch (method) {
    case 'GET':
      try {
        const session = await getSession(req, res)

        if (!session) {
          res.status(500).json({ error: 'No session' })
          return
        }

        const sessionUser = session.user
        const user = await prisma.user.findUnique({
          where: { email: sessionUser.email },
        })

        if (!user) {
          res.status(500).json({ error: 'Error fetching user' })
          return
        }

        res.status(200).json({
          ...user,
          user: sessionUser,
        })
      } catch (e) {
        console.error('Request error', e)
        res.status(500).json({ error: 'Error fetching user' })
      }
      break
    default:
      res.setHeader('Allow', ['POST'])
      res.status(405).end(`Method ${method} Not Allowed`)
      break
  }
}
