import { useSearchResults } from 'components/gatherer/SearchContext'
import { FC } from 'react'
import styled from 'styled-components'

export const SearchButton: FC = () => {
  const { search, loading } = useSearchResults()

  return (
    <Button onClick={search} disabled={loading}>
      Search
    </Button>
  )
}

const Button = styled.button`
  height: 40px;
`
