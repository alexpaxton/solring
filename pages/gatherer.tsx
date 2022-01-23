import { SearchBar } from 'components/gatherer/SearchBar'
import { SearchResults } from 'components/gatherer/SearchResults'
import { FiltersContextProvider, SearchContextProvider } from 'contexts'
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
