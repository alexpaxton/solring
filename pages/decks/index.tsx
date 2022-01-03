import { DeckGrid } from 'components/DeckGrid'
import { prisma } from 'data_utils'
import {
  GetStaticProps, InferGetStaticPropsType
} from 'next'
import Head from 'next/head'
import styled from 'styled-components'
import { DeckWithHandle } from 'types'
import { pluralizer } from 'utils'

interface Props {
  decks: DeckWithHandle[];
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  try {
    const decks = await prisma.deck.findMany({
      orderBy: { title: 'asc' },
      include: { creator: { select: { handle: true } } } 
    })

    return { props: { decks } }
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
    <DecksPage>
      <Head>
        <title>Sol Ring / Decks</title>
      </Head>
      <p>{title}</p>
      {body}
    </DecksPage>
  )
}

export default Decks

const DecksPage = styled.div`
  padding: 30px;
  flex: 1 0 0;
  width: 100%;
  overflow: auto;

  > p {
    margin-bottom: 30px;
  }
`
