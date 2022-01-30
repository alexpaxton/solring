import { SearchResultCard } from 'components/cards/SearchResultCard'
import { CardGrid } from 'components/deck/CardGrid'
import { colors } from 'components/ui'
import { useSearchResults } from 'contexts'
import { FC } from 'react'
import styled from 'styled-components'

export const SearchResults: FC = () => {
  const { results, loading, error } = useSearchResults()

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
        <MessageText>
          Fill out some of the fields above and click <strong>Search</strong>
        </MessageText>
      </ResultsContainer>
    )
  }

  return (
    <ResultsContainer>
      <CardGrid>
        {results.map((card) => (
          <SearchResultCard key={card.id} card={card} />
        ))}
      </CardGrid>
    </ResultsContainer>
  )
}

const MessageText = styled.p`
  padding: 80px 0;
  color: ${colors.n4};
  font-size: 18px;
`

const ResultsContainer = styled.div`
  width: 100%;
  flex: 1 0 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  overflow-y: auto;
  padding: 30px;
`
