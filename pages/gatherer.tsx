import { FiltersContextProvider } from 'components/gatherer/FiltersContext'
import { SearchBar } from 'components/gatherer/SearchBar'
import { SearchContextProvider } from 'components/gatherer/SearchContext'
import { SearchResults } from 'components/gatherer/SearchResults'
import { NextPage } from 'next'
import Head from 'next/head'

const GathererPage: NextPage = () => {
  return (
    <FiltersContextProvider>
      <SearchContextProvider>
        <Head>
          <title>Sol Ring / Gatherer</title>
        </Head>
        <SearchBar />
        <SearchResults />
      </SearchContextProvider>
    </FiltersContextProvider>
  )
}

export default GathererPage
