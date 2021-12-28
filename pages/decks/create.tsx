import { CreateDeckForm, DraftDeck } from 'components/CreateDeckForm'
import type { NextPage } from 'next'
import { useUser } from '@auth0/nextjs-auth0'

const CreateDeck: NextPage = () => {
  const {user, isLoading, error} = useUser()

  async function handleSubmit(draftDeck: DraftDeck) {
    if (!user) {
      return
    }

    const data = {
      ...draftDeck,
      createdAt: new Date(Date.now()),
      updatedAt: new Date(Date.now()),
      creatorId: 'boosh',
    }

    try {
      const resp = await fetch('/api/decks/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      if (resp.status === 200) {
        window.alert('deck created!')
      }
    } catch(err) {
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
