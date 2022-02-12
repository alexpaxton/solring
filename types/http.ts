import { NextApiRequest, NextApiResponse } from 'next'
import { Me } from './index'

export type HTTPMethod = 'POST' | 'GET' | 'PATCH' | 'DELETE'

export interface ApiRequest<B = any> extends NextApiRequest {
  body: B
  user: Me | null
  method: HTTPMethod | undefined
}

export type NextRoute<T = any> = (
  req: ApiRequest,
  res: NextApiResponse<T>,
) => Promise<void>

/** B = request body, R = response object */
export type NextRouteWithUser<B, R = any> = (
  req: ApiRequest<B>,
  res: NextApiResponse<R>,
) => Promise<void>
