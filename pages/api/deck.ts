import { handleDeck } from 'api'
import { withUser } from 'middleware/api'
import { NextRouteWithUser } from 'types'

const assetHandler: NextRouteWithUser<any> = async (req, res) => {
  const { method } = req
  if (!method) {
    res.status(500).json({ error: `${req.method} is not a valid method` })
    return
  }

  return await handleDeck[method](req, res)
}

export default withUser(assetHandler)
