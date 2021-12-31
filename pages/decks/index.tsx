import {
  GetStaticProps, InferGetStaticPropsType 
} from 'next'
import { DeckGrid } from 'components/DeckGrid'
import { DeckWithHandle } from 'types'
import Head from 'next/head'
import { pluralizer } from 'utils'
import { prisma } from 'data_utils'

interface Props {
  decks: DeckWithHandle[];
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  try {
    const decks = await prisma.deck.findMany({
      orderBy: { title: 'asc' },
      include: { creator: { select: { handle: true } } } 
    })

    return { props: { decks }, }
  } catch (err) {
    console.error(err)
    return { props: { decks: [] } }
  }
}

function Decks({ decks }: InferGetStaticPropsType<typeof getStaticProps>) {
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
