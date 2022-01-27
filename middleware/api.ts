import { getSession } from '@auth0/nextjs-auth0'
import { prisma } from 'data_utils'
import { Me, NextRoute, NextRouteWithUser } from 'types'

export const withUser = (route: NextRouteWithUser): NextRoute => {
  return async (req, res) => {
    const session = getSession(req, res)

    if (!session?.user) {
      res.status(401).json({
        error:
          'The user does not have an active session or is not authenticated',
      })
      return
    }

    const user = (await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { decks: { select: { id: true, title: true } } },
    })) as Me

    if (!user) {
      res.status(401).json({
        error:
          'The user does not have an active session or is not authenticated',
      })
      return
    }

    const reqWithUser = Object.assign(req, { user })

    return route(reqWithUser, res)
  }
}
