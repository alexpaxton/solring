import useSWR from 'swr'
import { APIMeData } from 'types'

const fetchMe = async (url: string) => fetch(url).then((res) => res.json())
export const useMe = () => {
  const { data, error } = useSWR<APIMeData>('/api/me', fetchMe)
  return {
    me: data?.data,
    isLoading: !error && !data,
    isError: !!error || !!data?.error,
  }
}
