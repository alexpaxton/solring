import { DeckGrid } from 'components/DeckGrid'
import { SearchBar } from 'components/gatherer/SearchBar'
import { SearchContextProvider } from 'components/gatherer/SearchContext'
import { SearchResults } from 'components/gatherer/SearchResults'
import { NextPage } from 'next'
import Head from 'next/head'
import { FC } from 'react'
import { DeckWithHandle } from 'types'
import {
  pluralizer, useDecksWithHandles
} from 'utils'

interface Props {
  fallback: {
    '/api/decks/all': DeckWithHandle[]
  }
}

const DecksIndexGrid: FC = () => {
  const {
    decks, isError, isLoading
  } = useDecksWithHandles()

  if (isLoading) {
    return <p>Loading...</p>
  }

  if (isError) {
    return <p>Error fetching decks</p>
  }

  if (!decks || !decks.length) {
    return <p>No decks exist yet</p>
  }

  return (
    <>
      <p>{`${decks.length} ${pluralizer('Deck', decks.length)}`}</p>
      <DeckGrid decks={decks} />
    </>
  )

}

const GathererPage: NextPage<Props> = () => {
  return (
    <SearchContextProvider>
      <Head>
        <title>Sol Ring / Gatherer</title>
      </Head>
      <SearchBar />
      <SearchResults />
    </SearchContextProvider>
  )
}

export default GathererPage
