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
import { pluralizer } from 'utils'

export const SearchBar: FC = () => {
  const { search, results, loading } = useSearchResults()

  const resultsCount = `${pluralizer('Card', results.length, true)} found`

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
      <SearchControls>
        <ControlText>Filters:</ControlText>
        <Filters>
          <CardTypeFilter />
          <ColorFilter />
          <CMCFilter />
          <RuleTextFilter />
          <CardNameFilter />
        </Filters>
        <ControlText>{resultsCount}</ControlText>
      </SearchControls>
    </StyledPageHeader>
  )
}

const StyledPageHeader = styled(PageHeader)`
  flex-direction: column;
`

const SearchControls = styled.div`
  display: flex;
`

const ControlText = styled.p`
  font-size: 14px;
  font-weight: 500;
  line-height: 40px;

  *:first-child {
    margin-right: 8px;
  }

  *:last-child {
    margin-left: 8px;
  }
`

const Filters = styled.div`
  display: flex;
  flex: 1 0 0;
  flex-wrap: wrap;

  & > * {
    margin: 4px;
  }
`

const Container = styled.div`
  display: flex;
  margin-bottom: 4px;
`
