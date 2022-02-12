import { getSession } from '@auth0/nextjs-auth0'
import { prisma } from 'data_utils'
import { Me, NextRoute, NextRouteWithUser } from 'types'

export const withUser = (route: NextRouteWithUser<any>): NextRoute => {
  return async (req, res) => {
    const session = getSession(req, res)
    const sessionUser = session?.user
    let user: null | Me = null
    if (sessionUser) {
      const prismaUser = await prisma.user.findUnique({
        where: { email: sessionUser.email },
        include: { decks: { select: { id: true, title: true } } },
      })

      if (prismaUser) {
        user = prismaUser as Me
      }
    }

    const reqWithUser = Object.assign(req, { user })

    return route(reqWithUser, res)
  }
}
