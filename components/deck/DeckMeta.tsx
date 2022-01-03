import { useDeck } from 'components/deck/DeckContext'
import Link from 'next/link'
import { FC } from 'react'
import styled from 'styled-components'

interface Props {
  deckId: string
}

export const DeckMeta: FC<Props> = ({ deckId }) => {
  const {
    title, description, error, loading, updateField, submit 
  } = useDeck()
  return (
    <Container>
      {error && <Error>{error}</Error>}
      <TitleBar>
        <input
          type="text"
          name="title"
          value={title}
          onChange={updateField}
          placeholder="Name your deck"
          disabled={loading}
        />
        <div>
          <Link href={`/decks/${deckId}`}>
            <button disabled={loading}>Cancel</button>
          </Link>
          <button onClick={submit} disabled={loading}>Save</button>
        </div>
      </TitleBar>
      <input
        type="text"
        name="description"
        value={description}
        onChange={updateField}
        placeholder='Describe your deck'
        disabled={loading}
      />
    </Container>
  )
}

const Error = styled.div`
  color: #ff0000;
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 30px;
  border-bottom: 1px solid #eee;
`

const TitleBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`