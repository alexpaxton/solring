import { Button } from 'components/ui'
import { useSearchResults } from 'contexts'
import { FC } from 'react'

export const SearchButton: FC = () => {
  const { search, loading } = useSearchResults()

  return (
    <Button onClick={search} disabled={loading} variant="primary">
      Search
    </Button>
  )
}
