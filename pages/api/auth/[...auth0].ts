import { NextApiRequest, NextApiResponse } from 'next'
import {
  Session,
  handleAuth,
  handleCallback,
} from '@auth0/nextjs-auth0'
import { prisma } from 'utils/prisma'

interface TransientStore {
  [key: string]: any
}

type AfterCallback = (
  req: NextApiRequest,
  res: NextApiResponse,
  session: Session,
  state: TransientStore
) => Promise<Session>;

const afterCallback: AfterCallback = async (
  req,
  res,
  session,
  state
) => {
  const email = session.user.email
  console.log('email', email)
  const user = await prisma.user.findUnique({ where: { email } })
  if (user && user.handle) {
    console.log('User exists, proceed')
  } else {
    console.log('User does not exist or has not chosen a handle')
    state.returnTo = `${state.returnTo}/user/pick-a-handle`
    console.log('state', state)
  }
  return session
}

export default handleAuth({
  async callback(req, res) {
    try {
      await handleCallback(req, res, { afterCallback })
    } catch (error: any) {
      res.status(error.status || 500).end(error.message)
    }
  },
})
