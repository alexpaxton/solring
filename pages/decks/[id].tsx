import { GetStaticProps, InferGetStaticPropsType } from 'next'
import { addHandleToDeck, prisma } from 'utils/prisma'
import { Deck } from 'types'
import { EditDeckButton } from 'components/EditDeckButton'
import Head from 'next/head'
import { Username } from 'components/Username'
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
        <TitleBar>
          <h1>{deck.title}</h1>
          <EditDeckButton creatorId={deck.creatorId} />
        </TitleBar>
        <p>
          Created by <Username>{deck.creatorHandle}</Username>
        </p>
        <Description>{deck.description || 'No description'}</Description>
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

const TitleBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const Description = styled.p`
  font-size: 13px;
  margin-top: 24px;
`

