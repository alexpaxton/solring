import {
  GetStaticProps, InferGetStaticPropsType 
} from 'next'
import { DeckWithHandle } from 'types'
import { EditDeckButton } from 'components/EditDeckButton'
import Head from 'next/head'
import { Username } from 'components/Username'
import { prisma } from 'data_utils'
import styled from 'styled-components'

interface Props {
  deck: DeckWithHandle | null;
  error?: string;
}

export const getStaticProps: GetStaticProps<Props> = async (context) => {
  const id = context.params?.id as string

  try {
    const deck = await prisma.deck.findUnique({
      where: { id: id },
      include: { creator: { select: { handle: true } } } 
    })
    const error = deck ? undefined : 'Couldn\'t find a deck with that ID'

    return { props: {
      deck,
      error 
    }, }
  } catch (err) {
    console.error(err)
    return { props: {
      deck: null,
      error: 'Error fetching deck' 
    } }
  }
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  }
}

function DeckPage({
  deck, error 
}: InferGetStaticPropsType<typeof getStaticProps>) {
  let title = 'Loading...'
  let body = <p>Loading...</p>

  if (error) {
    title = 'Oh no!'
    body = (
      <p>{error}</p>
    )
  }

  if (deck) {
    title = deck.title
    body = (
      <DeckMeta>
        <TitleBar>
          <h1>{deck.title}</h1>
          <EditDeckButton creatorId={deck.creatorId} />
        </TitleBar>
        <p>
          Created by <Username>{deck.creator.handle}</Username>
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

