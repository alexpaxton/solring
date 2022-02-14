import { APIDictionary } from 'types'
import { handleDeckDelete } from './delete'
import { handleDeckGet } from './get'
import { handleDeckPatch } from './patch'
import { handleDeckPost } from './post'

export const handleDeck: APIDictionary = {
  DELETE: handleDeckDelete,
  GET: handleDeckGet,
  PATCH: handleDeckPatch,
  POST: handleDeckPost,
}
