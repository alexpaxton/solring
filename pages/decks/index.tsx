import { GetStaticProps, InferGetStaticPropsType } from 'next'
import {Deck} from 'types'
import Head from 'next/head'
import {prisma} from 'utils/prisma'
import { stringifyDeckTimestamps } from 'utils'
import styled from 'styled-components'

interface Props {
  decks: Deck[]
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  try {
    const prismaDecks = await prisma.deck.findMany({ orderBy: { title: 'asc' } })
    const decks = stringifyDeckTimestamps(prismaDecks)
    return {
      props: { decks },
    }
  } catch (err) {
    console.error(err)
    return { props: { decks: [] } }
  }
}

function Decks({decks}: InferGetStaticPropsType<typeof getStaticProps>) {
  let body = <p>No decks exist</p>

  if (decks.length) {
    body = (
      <DeckGrid>
        {decks.map((deck) => (
          <DeckCard key={deck.id}>{deck.title}</DeckCard>
        ))}
      </DeckGrid>
    )
  }
  return (
    <>
      <Head>
        <title>Sol Ring / Decks</title>
      </Head>
      <p>{decks.length} Decks</p>
      {body}
    </>
  )
}

export default Decks

const DeckGrid = styled.div`
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  display: grid;
  column-gap: 8px;
  row-gap: 8px;
  margin-top: 30px;
`

const DeckCard = styled.div`
  height: 100px;
  background-color: #ccc;
  border-radius: 4px;
  padding: 8px;
`
