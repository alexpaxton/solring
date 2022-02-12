import { Button, colors, Dialog, Input } from 'components/ui'
import { ChangeEvent, FC, useState } from 'react'
import styled from 'styled-components'
import { DeckPostBody } from 'types'

interface Props {
  onSubmit: (Draft: DeckPostBody) => void
  onDismiss: () => void
}

export const CreateDeckForm: FC<Props> = ({ onSubmit, onDismiss }) => {
  const [title, updateTitle] = useState<string>('')
  const [description, updateDescription] = useState<string>('')
  const [error, setError] = useState<string>('')

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    const fieldTitle = e.target.name

    if (fieldTitle === 'title') {
      updateTitle(e.target.value)
    }

    if (fieldTitle === 'description') {
      updateDescription(e.target.value)
    }
  }

  function validate() {
    if (title === '' || description === '') {
      setError('Name & Description are required!')
      return false
    } else {
      setError('')
      return true
    }
  }

  function handleSubmit() {
    const valid = validate()
    if (valid) {
      onSubmit({
        title,
        description,
      })
    }
  }

  return (
    <Dialog title="Create a deck" onDismiss={onDismiss}>
      <Main>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <BigInput
          placeholder="Name"
          type="text"
          name="title"
          value={title}
          onChange={handleInputChange}
          spellCheck={false}
          autoFocus={true}
        />
        <BigInput
          placeholder="Description"
          type="text"
          name="description"
          value={description}
          onChange={handleInputChange}
          spellCheck={false}
        />
      </Main>
      <footer>
        <Button onClick={onDismiss} variant="neutral">
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant="primary">
          Create
        </Button>
      </footer>
    </Dialog>
  )
}

const BigInput = styled(Input)`
  width: 100%;
  height: 62px;
  font-size: 18px;
  padding: 0 24px;
  border-radius: 6px;

  &:first-of-type {
    margin-bottom: 12px;
  }
`

const ErrorMessage = styled.p`
  color: ${colors.r2};
  margin-bottom: 12px;
  padding: 0 24px;
`

const Main = styled.main`
  flex-direction: column;
`
