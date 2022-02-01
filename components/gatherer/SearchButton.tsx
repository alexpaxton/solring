import { Button } from 'components/ui'
import { useFilters, useSearchResults } from 'contexts'
import { FC } from 'react'
import styled from 'styled-components'

export const SearchButton: FC = () => {
  const { search, loading } = useSearchResults()
  const { dispatch } = useFilters()

  function handleReset() {
    dispatch({ type: 'reset' })
  }

  return (
    <Buttons>
      <Button onClick={search} disabled={loading} variant="primary">
        Search
      </Button>
      <Button onClick={handleReset} disabled={loading} variant="neutral">
        Reset
      </Button>
    </Buttons>
  )
}

const Buttons = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;

  > button:first-child {
    margin-bottom: 8px;
  }
`
