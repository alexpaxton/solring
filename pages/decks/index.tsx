import { GetStaticProps, InferGetStaticPropsType } from 'next'
import { addHandleToDeck, prisma } from 'utils/prisma'
import {Deck} from 'types'
import {DeckCard} from 'components/DeckCard'
import Head from 'next/head'
import {pluralizer} from 'utils'
import { stringifyDeckTimestamps } from 'utils'
import styled from 'styled-components'

interface Props {
  decks: Deck[]
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  try {
    const prismaDecks = await prisma.deck.findMany({ orderBy: { title: 'asc' } })
    const cleanedDecks = stringifyDeckTimestamps(prismaDecks)
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
      <DeckGrid>
        {decks.map((deck) => (
          <DeckCard key={deck.id} {...deck}/>
        ))}
      </DeckGrid>
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

const DeckGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-auto-rows: 1fr;
  grid-gap: 8px;
  margin-top: 30px;

  &:before {
    content: "";
    width: 0;
    padding-bottom: 70%;
    grid-row: 1 / 1;
    grid-column: 1 / 1;
  }

  & > *:first-child {
    grid-row: 1 / 1;
    grid-column: 1 / 1;
  }
`