import { GetStaticProps, InferGetStaticPropsType } from 'next'
import { addHandleToDeck, prisma } from 'utils/prisma'
import { Deck } from 'types'
import Head from 'next/head'
import { stringifyDeckTimestamps } from 'utils'
import styled from 'styled-components'

interface Props {
  deck?: Deck;
}

export const getStaticProps: GetStaticProps<Props> = async (context) => {
  const id = context.params?.id as string

  try {
    const prismaDeck = await prisma.deck.findUnique({where: {id: id}})
    if (!prismaDeck) {
      throw new Error('Can\'t find deck with that id')
    }

    const cleanedDeck = stringifyDeckTimestamps(prismaDeck)
    const deckWithHandle = await addHandleToDeck(cleanedDeck)

    return {
      props: { deck: deckWithHandle },
    }
  } catch (err) {
    console.error(err)
    return { props: { deck: undefined } }
  }
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  }
}

function DeckPage({ deck }: InferGetStaticPropsType<typeof getStaticProps>) {
  let title = 'Loading...'
  let body = <p>Loading...</p>



  if (deck) {
    title = deck.title
    body = (
      <DeckMeta>
        <h1>{deck.title}</h1>
        <p>
          Created by <strong>{deck.creatorHandle}</strong>
        </p>
        <p>{deck.description || 'No description'}</p>
      </DeckMeta>
    )
  }

  return (
    <>
      <Head>
        <title>Sol Ring / {title}</title>
      </Head>
      {body}
    </>
  )
}

export default DeckPage

const DeckMeta = styled.div`
    display: flex;
    flex-direction: column;
    padding-bottom: 60px;
    border-bottom: 1px solid #eee;
    margin-bottom: 60px;
`

