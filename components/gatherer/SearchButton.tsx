import { Button } from 'components/ui'
import { useSearchResults } from 'contexts'
import { FC } from 'react'
import styled from 'styled-components'

export const SearchButton: FC = () => {
  const { search, loading } = useSearchResults()

  return (
    <BigButton onClick={search} disabled={loading} variant="primary">
      Search
    </BigButton>
  )
}

const BigButton = styled(Button)`
  height: 46px;
  font-size: 16px;
  margin-left: 18px;
  padding: 0 16px;
`
