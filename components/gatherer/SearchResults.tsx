import { SearchResultCard } from 'components/cards/SearchResultCard'
import { CardGrid } from 'components/deck/CardGrid'
import { FocusPanel } from 'components/gatherer/FocusPanel'
import { useSearchResults } from 'components/gatherer/SearchContext'
import { FC } from 'react'
import styled from 'styled-components'

export const SearchResults: FC = () => {
  const {
    results, loading, error
  } = useSearchResults()
  
  if (loading) {
    return (
      <ResultsContainer>
        <MessageText>Loading...</MessageText>
      </ResultsContainer>
    )
  }

  if (error) {
    return (
      <ResultsContainer>
        <MessageText>{error}</MessageText>
      </ResultsContainer>
    )
  }

  if (!results.length) {
    return (
      <ResultsContainer>
        <MessageText>Fill out some of the fields above and click <strong>Search</strong></MessageText>
      </ResultsContainer>
    )
  }

  return <ResultsContainer>
    <MainPanel>
      <CardGrid>
        {results.map(card => <SearchResultCard key={card.id} card={card} />)}
      </CardGrid>
    </MainPanel>
    <FocusPanel />
  </ResultsContainer>
}

const MessageText = styled.p`
  padding: 80px 0;
`

const ResultsContainer = styled.div`
  width: 100%;
  flex: 1 0 0;
  display: flex; 
  flex-direction: row;
  justify-content: center;
  position: relative;
`

const MainPanel = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: calc(100% - 400px);
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  padding: 30px;

  &:only-child {
    width: 100%;
  }
`
