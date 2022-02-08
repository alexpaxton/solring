import { Header } from 'components/deck/DeckElements'
import { useDeckEditor } from 'components/deck/editor/EditorContext'
import { Button, colors, Input } from 'components/ui'
import Link from 'next/link'
import { FC } from 'react'
import styled from 'styled-components'
import { rgba } from 'utils'

export const EditorHeader: FC = () => {
  const { title, error, loading, updateField, submit, deckId } = useDeckEditor()
  return (
    <StyledHeader>
      <div>
        <StyledInput
          type="text"
          name="title"
          value={title}
          onChange={updateField}
          placeholder="Name your deck"
          disabled={loading}
          spellCheck={false}
        />
        {error && <Error>{error}</Error>}
      </div>
      <div>
        <Link href={`/decks/${deckId}`}>
          <Button disabled={loading} variant="neutral">
            Cancel
          </Button>
        </Link>
        <Button onClick={submit} disabled={loading} variant="secondary">
          Save
        </Button>
      </div>
    </StyledHeader>
  )
}

const StyledHeader = styled(Header)`
  align-items: center;
  justify-content: space-between;

  > div {
    display: inherit;
  }

  button {
    margin-left: 16px;
  }
`

const StyledInput = styled(Input)`
  width: 400px;
`

const Error = styled.div`
  background-color: ${rgba(colors.r1, 0.25)};
  font-size: 14px;
  display: flex;
  align-items: center;
  border-radius: 4px;
  padding: 0 12px;
  border: 2px solid ${colors.r1};
  color: ${colors.n7};
  margin-left: 12px;
`
