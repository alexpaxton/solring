import {Card, Cards} from 'scryfall-sdk'
import { ChangeEvent, FC, useState } from 'react'
import { MagicCard } from 'components/MagicCard'
import styled from 'styled-components'

export const Test: FC =() => {
  const [inputValue, setInputValue] = useState<string>('')
  const [pending, setPending] = useState<boolean>(false)
  const [results, setResults] = useState<Card[]>([])

  const fetchyFetch = async () => {
    setPending(true)
    try {
      const resp = await Cards.search(inputValue)
      const data = await resp.waitForAll()

      setResults(data)
      setPending(false)
    } catch(err) {
      setPending(false)
      console.error(err)

    }
  }

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    setInputValue(e.target.value)
  }

  return (
    <Container>
      <Search>
        <input
          type="text"
          value={inputValue}
          placeholder="Search magic cards..."
          onChange={handleInputChange}
          maxLength={1000}
          disabled={pending}
        />
        <button onClick={fetchyFetch} disabled={pending}>Search</button>
      </Search>
      <Results>
        {pending && <p>Loading...</p>}
        {!pending && results.map(card => <MagicCard key={card.id} {...card}/>)}
      </Results>
    </Container>
  )
}

const Container = styled.div`
  padding: 30px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
`

const Search = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 30px;

  button {
    margin-left: 8px;
  }
`

const Results = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  grid-template-rows: 1fr;
  grid-gap: 8px;
  overflow: auto;
`
