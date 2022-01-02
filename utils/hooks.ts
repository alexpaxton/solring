import {
  RefObject,
  useEffect, useState
} from 'react'
import { Me } from 'types'
import { getMe } from 'utils'

interface UseMe extends Me {
  forceRefresh: () => Promise<void>
}

export const useMe = (): UseMe => {
  const [ isLoading, setLoading ] = useState<boolean>(true)
  const [ me, updateMe ] = useState<Me>({ isLoading: true })

  useEffect(() => {
    getCurrentUser()
  }, [])

  async function getCurrentUser(): Promise<void> {
    setLoading(true)
    const fetchedUser = await getMe()

    if (
      fetchedUser &&
      fetchedUser.id &&
      fetchedUser.handle &&
      fetchedUser.user
    ) {
      updateMe({
        ...me,
        id: fetchedUser.id,
        handle: fetchedUser.handle,
        user: fetchedUser.user,
      })
    }

    setLoading(false)
  }

  return {
    ...me,
    isLoading,
    forceRefresh: getCurrentUser 
  }
}

type UseOnClickOutside = (ref: RefObject<HTMLElement>, handler: (e: MouseEvent) => void) => void

export const useOnClickOutside: UseOnClickOutside = (ref, handler) => {
  useEffect(
    () => {
      const listener = (event: MouseEvent) => {
        const target = event.target as HTMLElement
        // Do nothing if clicking ref's element or descendent elements
        if (!ref.current || ref.current.contains(target)) {
          return
        }
        handler(event)
      }
      document.addEventListener('mousedown', listener)
      return () => {
        document.removeEventListener('mousedown', listener)
      }
    },
    // Add ref and handler to effect dependencies
    // It's worth noting that because passed in handler is a new ...
    // ... function on every render that will cause this effect ...
    // ... callback/cleanup to run every render. It's not a big deal ...
    // ... but to optimize you can wrap handler in useCallback before ...
    // ... passing it into this hook.
    [ ref, handler ]
  )
}