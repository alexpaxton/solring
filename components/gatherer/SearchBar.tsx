import { CardNameFilter } from 'components/gatherer/CardNameFilter'
import { CardTypeFilter } from 'components/gatherer/CardTypeFilter'
import { CMCFilter } from 'components/gatherer/CMCFilter'
import { ColorFilter } from 'components/gatherer/ColorFilter'
import { RuleTextFilter } from 'components/gatherer/RuleTextFilter'
import { SearchButton } from 'components/gatherer/SearchButton'
import { PageHeader } from 'components/layout'
import { FC } from 'react'
import styled from 'styled-components'

export const SearchBar: FC = () => {
  return (
    <PageHeader>
      <SearchRows>
        <SearchRow>
          <CardNameFilter />
          <RuleTextFilter />
        </SearchRow>
        <SearchRow>
          <CardTypeFilter />
          <CMCFilter />
          <ColorFilter />
        </SearchRow>
      </SearchRows>
      <SearchButton />
    </PageHeader>
  )
}

const SearchRows = styled.div`
  flex: 1 0 0;
  margin-right: 30px;
  display: flex;
  flex-direction: column;
`

const SearchRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;

  & > * {
    margin-right: 8px;
  }

  & > *:last-child {
    margin-right: 0;
  }

  &:last-child {
    margin-bottom: 0;
  }
`
