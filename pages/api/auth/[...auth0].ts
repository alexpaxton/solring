import {
  handleAuth,
  handleCallback, Session
} from '@auth0/nextjs-auth0'
import { prisma } from 'data_utils'
import {
  NextApiRequest, NextApiResponse
} from 'next'

interface TransientStore {
  [key: string]: any
}

type AfterCallback = (
  req: NextApiRequest,
  res: NextApiResponse,
  session: Session,
  state: TransientStore
) => Promise<Session>

const afterCallback: AfterCallback = async (
  req,
  res,
  session,
  state
) => {
  const email = session.user.email
  const user = await prisma.user.findUnique({ where: { email } })
  if (user && user.handle) {
    console.log('User exists, proceed')
  } else {
    state.returnTo = `${state.returnTo}/register/pick-a-handle`
  }
  return session
}

export default handleAuth({ async callback(req, res) {
  try {
    await handleCallback(req, res, { afterCallback })
  } catch (error: any) {
    res.status(error.status || 500).end(error.message)
  }
}, })
