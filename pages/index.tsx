import Head from 'next/head'
import type { NextPage } from 'next'
import {Test} from 'components/Test'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Sol Ring / MTG Deckbuilder</title>
        <meta name="description" content="MTG Deck Builder" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Test />
    </>
  )
}

export default Home
