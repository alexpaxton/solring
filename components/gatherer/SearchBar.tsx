import { CardNameFilter } from 'components/gatherer/CardNameFilter'
import { CardTypeFilter } from 'components/gatherer/CardTypeFilter'
import { CMCFilter } from 'components/gatherer/CMCFilter'
import { ColorFilter } from 'components/gatherer/ColorFilter'
import { QueryInput } from 'components/gatherer/QueryInput'
import { RuleTextFilter } from 'components/gatherer/RuleTextFilter'
import { SearchButton } from 'components/gatherer/SearchButton'
import { PageHeader } from 'components/layout'
import { useSearchResults } from 'contexts'
import { FC, KeyboardEvent } from 'react'
import styled from 'styled-components'

export const SearchBar: FC = () => {
  const { search, loading } = useSearchResults()

  function handleSubmit(e: KeyboardEvent) {
    if (loading === false && e.key === 'Enter') {
      search()
    }
  }

  return (
    <StyledPageHeader onKeyUp={handleSubmit}>
      <Container>
        <QueryInput />
        <SearchButton />
      </Container>
      <Filters>
        <CardTypeFilter />
        <ColorFilter />
        <CMCFilter />
        <RuleTextFilter />
        <CardNameFilter />
      </Filters>
    </StyledPageHeader>
  )
}

const StyledPageHeader = styled(PageHeader)`
  flex-direction: column;
`

const Filters = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-left: -4px;
  margin-right: -4px;

  & > * {
    margin: 4px;
  }
`

const Container = styled.div`
  display: flex;
  margin-bottom: 4px;
`
