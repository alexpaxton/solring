import {useEffect, useState} from 'react'
import {Me} from 'types'
import {getMe} from 'utils'
import {useRouter} from 'next/router'

export const useMe = (): Me => {
  const {pathname} = useRouter()
  const [isLoading, setLoading] = useState<boolean>(true)
  const [me, updateMe] = useState<Me>({isLoading: true})

  useEffect(() => {
    getCurrentUser()
  }, [pathname])

  async function getCurrentUser(): Promise<void> {
    setLoading(true)
    const fetchedUser = await getMe()
  
    if (fetchedUser && fetchedUser.id && fetchedUser.handle && fetchedUser.user) {
      updateMe({...me, id: fetchedUser.id, handle: fetchedUser.handle, user: fetchedUser.user})
    }

    setLoading(false)
  }

  return {...me, isLoading}
}