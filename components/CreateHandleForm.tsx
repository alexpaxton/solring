import {
  ChangeEvent, FC, useState 
} from 'react'
import { createUser } from 'utils'
import { sanitizeHandleInput } from 'utils'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import { useUser } from '@auth0/nextjs-auth0'

export const CreateHandleForm: FC = () => {
  const { push } = useRouter()
  const { user } = useUser()
  const [ draftHandle, setDraftHandle ] = useState<string>('')
  const [ error, setError ] = useState<string>('')

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    const sanitizedInput = sanitizeHandleInput(e.target.value)
    setDraftHandle(sanitizedInput)
  }

  function validateForm(): boolean {
    let errors = 0

    if (draftHandle.length === 0) {
      errors +=1
      setError('Cannot be blank')
    }

    if (!user) {
      errors += 1
      setError('Not logged in, no email detected')
    }

    return errors === 0 
  }

  function handleSuccess() {
    push('/')
  }

  async function handleSubmit() {
    const isValid = validateForm()

    if (isValid && user && user.email) {
      createUser({
        email: user.email,
        handle: draftHandle 
      }, handleSuccess)
    }

  }

  return (
    <Form>
      <h3>Pick a handle</h3>
      <p>This is how other users will see you on Sol Ring</p>
      <p>Must contain letters and numbers only</p>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <input type="text" value={draftHandle} onChange={handleInputChange} />
      <button onClick={handleSubmit}>Submit</button>
    </Form>
  )
}

const ErrorMessage = styled.div`
  color: #ff0000;
  font-weight: bold;
  margin: 8px 0;
`

const Form = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 500px;
    margin: 0 auto;

    input {
      margin-top: 30px;
      margin-bottom: 30px;
    }

    button {
      display: inline-block;
      width: auto;
    }
`