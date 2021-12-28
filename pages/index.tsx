import Head from 'next/head'
import type { NextPage } from 'next'
import {Test} from 'components/Test'
import { useUser } from '@auth0/nextjs-auth0'

const Home: NextPage = () => {
  const { user, error, isLoading } = useUser()
  if (isLoading) return <div>Loading...</div>
  if (error) return <div>{error.message}</div>

  function createDeck() {
    console.log(user?.sub)
  }

  if (user) {
    return (
      <div>
        <Head>
          <title>Sol Ring / MTG Deckbuilder</title>
          <meta name="description" content="MTG Deck Builder" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div>
          Welcome {user.name}! <a href="/api/auth/logout">Logout</a>
          <button onClick={createDeck}>Create Deck</button>
        </div>
        <Test />
      </div>
    )
  }

  return <a href="/api/auth/login">Login</a>
}

export default Home
