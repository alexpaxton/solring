import { Username } from 'components/Username'
import Link from 'next/link'
import { useRouter } from 'next/router'
import {
  ChangeEvent,
  FC,
  useState
} from 'react'
import styled from 'styled-components'
import { DeckWithHandle } from 'types'
import { updateDeck } from 'utils'

interface Props {
  deck: DeckWithHandle;
}

export const DeckEditor: FC<Props> = ({ deck }) => {
  const { push } = useRouter()
  const [ draftTitle, setDraftTitle ] = useState<string>(deck.title)
  const [ draftDescription, setDraftDescription ] = useState<string>(deck.description)
  const [ error, setError ] = useState<string>('')
  const [ loading, setLoading ] = useState<boolean>(false)

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    const {
      name, value 
    } = e.target

    if (name === 'title') {
      setDraftTitle(value)
    }
    if (name === 'description') {
      setDraftDescription(value)
    }
  }

  function validateForm(): boolean {
    if (draftTitle === '') {
      setError('Name cannot be empty')
      return false
    }

    setError('')
    return true
  }

  async function handleSave() {
    const isValid = validateForm()

    if (isValid) {
      setLoading(true)

      try {
        const response = await updateDeck({
          ...deck,
          title: draftTitle,
          description: draftDescription 
        })

        if (response.error) {
          setError(response.error)
        } else if (response.deck) {
          push(`/decks/${response.deck.id}`)
        }
      } catch (err) {
        console.log(err)
      }

      setLoading(false)
    }
  }

  return (
    <DeckMeta>
      {error && <Error>{error}</Error>}
      <TitleBar>
        <input
          type="text"
          name="title"
          value={draftTitle}
          onChange={handleInputChange}
          placeholder="Name your deck"
          disabled={loading}
        />
        <div>
          <Link href={`/decks/${deck.id}`}>
            <button disabled={loading}>Cancel</button>
          </Link>
          <button onClick={handleSave} disabled={loading}>Save</button>
        </div>
      </TitleBar>
      <p>
          Created by <Username>{deck.creator.handle}</Username>
      </p>
      <input
        type="text"
        name="description"
        value={draftDescription}
        onChange={handleInputChange}
        placeholder='Describe your deck'
        disabled={loading}
      />
    </DeckMeta>
  )
}

const Error = styled.div`
  color: #ff0000;
`

const DeckMeta = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 60px;
  border-bottom: 1px solid #eee;
  margin-bottom: 60px;
`

const TitleBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`
