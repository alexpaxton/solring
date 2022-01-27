import { NextApiRequest, NextApiResponse } from 'next'
import { Me } from './index'

export type NextRoute<T = any> = (
  req: NextApiRequest,
  res: NextApiResponse<T>,
) => Promise<void>

export type NextRouteWithUser = (
  req: NextApiRequest & { user: Me },
  res: NextApiResponse,
) => Promise<void>
