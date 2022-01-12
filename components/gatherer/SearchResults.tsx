import { MagicCard } from 'components/cards/MagicCard'
import { CardGrid } from 'components/deck/CardGrid'
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
        <p>Loading...</p>
      </ResultsContainer>
    )
  }

  if (error) {
    return (
      <ResultsContainer>
        <p>{error}</p>
      </ResultsContainer>
    )
  }

  return <ResultsContainer>
    <CardGrid>
      {results.map(card => <MagicCard key={card.id} {...card} />)}
    </CardGrid>
  </ResultsContainer>
}

const ResultsContainer = styled.div`
  width: 100%;
  flex: 1 0 0;
  padding: 30px;
  display: flex; 
  overflow-y: auto;
  flex-direction: column;
  align-items: center;
`