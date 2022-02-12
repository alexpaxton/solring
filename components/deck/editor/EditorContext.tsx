import { updateDeck } from 'apiHelpers'
import { useCards } from 'components/deck/CardsContext'
import { useRouter } from 'next/router'
import { ChangeEvent, createContext, FC, useContext, useState } from 'react'
import { DeckWithHandle } from 'types'
import { scryfallToData } from 'utils'

interface EditorContextType {
  title: string
  description: string
  error: string
  updateField: (e: ChangeEvent<HTMLInputElement>) => void
  submit: () => Promise<void>
  loading: boolean
  deckId: string
}

interface Props {
  children: React.ReactNode
  deck: DeckWithHandle
}

const EditorContext = createContext<EditorContextType | undefined>(undefined)

export const EditorContextProvider: FC<Props> = ({ children, deck }) => {
  const { push } = useRouter()
  const [title, setTitle] = useState<string>(deck.title)
  const [description, setDescription] = useState<string>(deck.description)
  const [error, setError] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const { cards } = useCards()

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target

    if (name === 'title') {
      setTitle(value)
    }
    if (name === 'description') {
      setDescription(value)
    }
  }

  function validateForm(): boolean {
    if (title === '') {
      setError('Name cannot be empty!')
      return false
    }

    setError('')
    return true
  }

  async function handleSave() {
    const isValid = validateForm()

    if (isValid) {
      setLoading(true)

      const prismaCards = scryfallToData(cards)

      try {
        const updateResponse = await updateDeck({
          ...deck,
          title,
          description,
          cards: prismaCards,
        })

        if (updateResponse.error) {
          setError(updateResponse.error)
          setLoading(false)
        } else if (updateResponse.data) {
          window.alert(updateResponse.data)
          push(`/decks/${deck.id}`)
        }
      } catch (err) {
        console.log(err)
      }
    }
  }

  return (
    <EditorContext.Provider
      value={{
        title,
        description,
        error,
        updateField: handleInputChange,
        submit: handleSave,
        loading,
        deckId: deck.id,
      }}
    >
      {children}
    </EditorContext.Provider>
  )
}

export const useDeckEditor = (): EditorContextType => {
  const context = useContext(EditorContext)

  if (!context) {
    throw new Error(
      'useDeckEditor must be used as a child of EditorContextProvider',
    )
  }

  return context
}
