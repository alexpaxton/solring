import { useCards } from 'components/deck/CardsContext'
import { useRouter } from 'next/router'
import {
  ChangeEvent, createContext, FC, useContext, useState
} from 'react'
import {
  DeckViewMode, DeckWithHandle
} from 'types'
import {
  scryfallToData, updateDeck
} from 'utils'

interface DeckContextType {
  title: string
  description: string
  error: string
  updateField: (e: ChangeEvent<HTMLInputElement>) => void
  submit: () => Promise<void>
  loading: boolean
  mode: DeckViewMode
  setMode: (mode: DeckViewMode) => void
}

interface Props {
  children: React.ReactNode
  deck: DeckWithHandle
}

const DeckContext = createContext<DeckContextType | undefined>(undefined)

export const DeckContextProvider: FC<Props> = ({
  children, deck 
}) => {
  const { push } = useRouter()
  const [ title, setTitle ] = useState<string>(deck.title)
  const [ description, setDescription ] = useState<string>(deck.description)
  const [ error, setError ] = useState<string>('')
  const [ loading, setLoading ] = useState<boolean>(false)
  const { cards } = useCards()
  const [ mode, setMode ] = useState<DeckViewMode>('grid')


  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    const {
      name, value 
    } = e.target

    if (name === 'title') {
      setTitle(value)
    }
    if (name === 'description') {
      setDescription(value)
    }
  }

  function validateForm(): boolean {
    if (title === '') {
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
        } else if (updateResponse.deck) {
          push(`/decks/${updateResponse.deck.id}`)
        }
      } catch (err) {
        console.log(err)
      }
    }
  }

  return (
    <DeckContext.Provider value={{
      title,
      description,
      error,
      updateField: handleInputChange,
      submit: handleSave,
      loading,
      mode,
      setMode,
    }}>
      {children}
    </DeckContext.Provider>
  )
}

export const useDeck = (): DeckContextType => {
  const context = useContext(DeckContext)

  if (!context) {
    throw new Error('useDeck must be used as a child of DeckContextProvider')
  }

  return context
}