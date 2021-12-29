import {useEffect, useState} from 'react'
import {Me} from 'types'
import {getMe} from 'utils'

interface UseMe extends Me {
  forceRefresh: () => Promise<void>
}

export const useMe = (): UseMe => {
  const [isLoading, setLoading] = useState<boolean>(true)
  const [me, updateMe] = useState<Me>({ isLoading: true })

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

  return { ...me, isLoading, forceRefresh: getCurrentUser }
}