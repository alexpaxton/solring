import { GetStaticProps, InferGetStaticPropsType } from 'next'
import { addHandleToDeck, prisma } from 'data_utils'
import {Deck} from 'types'
import {DeckGrid} from 'components/DeckGrid'
import Head from 'next/head'
import {pluralizer} from 'utils'
import { stringifyDecksTimestamps } from 'utils'

interface Props {
  decks: Deck[]
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  try {
    const prismaDecks = await prisma.deck.findMany({ orderBy: { title: 'asc' } })
    const cleanedDecks = stringifyDecksTimestamps(prismaDecks)
    const decksWithHandles = await Promise.all(
      cleanedDecks.map(addHandleToDeck)
    )

    return {
      props: { decks: decksWithHandles },
    }
  } catch (err) {
    console.error(err)
    return { props: { decks: [] } }
  }
}

function Decks({decks}: InferGetStaticPropsType<typeof getStaticProps>) {
  let body = <p>No decks exist</p>
  const title = pluralizer('Deck', decks.length, true)

  if (decks.length) {
    body = (
      <DeckGrid decks={decks} />
    )
  }

  return (
    <>
      <Head>
        <title>Sol Ring / Decks</title>
      </Head>
      <p>{title}</p>
      {body}
    </>
  )
}

export default Decks
