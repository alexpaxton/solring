import { useSearchResults } from 'components/gatherer/SearchContext'
import {
  ChangeEvent, FC, useState
} from 'react'
import styled from 'styled-components'
import {
  pluralizer, useCardSearch
} from 'utils'

export const SearchBar: FC = () => {
  const { results } = useSearchResults()
  const [ cardName, updateCardName ] = useState<string>('')
  const [ ruleText, updateRuleText ] = useState<string>('')
  const [ cmc, updateCMC ] = useState<string>('')
  const [ query, setQuery ] = useState<Record<string, string | number>>({})

  const {
    data, isError 
  } = useCardSearch(query)

  function handleSubmit() {
    setQuery({
      cardName,
      ruleText,
      cmc,
    })
  }

  console.log(data, isError)
  
  return <SearchContainer>
    <SearchInput type="text" placeholder='card name' value={cardName} onChange={(e: ChangeEvent<HTMLInputElement>) => updateCardName(e.target.value)} />
    <SearchInput type="text" placeholder='rule text' value={ruleText} onChange={(e: ChangeEvent<HTMLInputElement>) => updateRuleText(e.target.value)} />
    <SearchInput type="number" placeholder='cmc' value={cmc} onChange={(e: ChangeEvent<HTMLInputElement>) => updateCMC(e.target.value)} />
    <SearchButton onClick={handleSubmit}>Search</SearchButton>
    <p>{pluralizer('Card', results.length, true)}</p>
  </SearchContainer>
}

const SearchContainer = styled.div`
  width: 100%;
  padding: 30px;
  display: flex;
  border-bottom: 1px solid #ddd;
`

const SearchInput = styled.input`
  height: 40px;
`

const SearchButton = styled.button`
  height: 40px;
`
