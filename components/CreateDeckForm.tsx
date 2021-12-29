import {ChangeEvent, FC, useState} from 'react'
import styled from 'styled-components'

export interface DraftDeck {
  title: string;
  description: string;
}

interface Props {
  onSubmit: (Draft: DraftDeck) => void;
}


export const CreateDeckForm: FC<Props> = ({onSubmit}) => {
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
      setError('Name & Description are required')
      return false
    } else {
      setError('')
      return true
    }
  }

  function handleSubmit() {
    const valid = validate()
    if (valid) {
      onSubmit({title, description})
    }
  }

  return (
    <Wrapper>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <input
        placeholder="Name"
        type="text"
        name="title"
        value={title}
        onChange={handleInputChange}
      />
      <input
        placeholder="Description"
        type="text"
        name="description"
        value={description}
        onChange={handleInputChange}
      />
      <button onClick={handleSubmit}>Create</button>
    </Wrapper>
  )
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    background-color: #ddd;
    padding: 30px;
    margin: 30px;
`

const ErrorMessage = styled.p`
    color: #ff0000;
`
