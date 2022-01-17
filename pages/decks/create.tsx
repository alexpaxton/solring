import { useUser } from '@auth0/nextjs-auth0'
import { CreateDeckForm, DraftDeck } from 'components/CreateDeckForm'
import type { NextPage } from 'next'

const CreateDeck: NextPage = () => {
  const { user, isLoading, error } = useUser()

  async function handleSubmit(draftDeck: DraftDeck) {
    if (!user) {
      return
    }

    const data = {
      ...draftDeck,
      createdAt: new Date(Date.now()),
    }

    try {
      const resp = await fetch('/api/decks/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      const { newDeck } = await resp.json()
      console.log('deck created!', newDeck)
      window.alert('deck created!')
    } catch (err) {
      console.error(err)
    }
  }

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>{error.message}</div>

  if (user) {
    return <CreateDeckForm onSubmit={handleSubmit} />
  }

  return <a href="/api/auth/login">Login</a>
}

export default CreateDeck
