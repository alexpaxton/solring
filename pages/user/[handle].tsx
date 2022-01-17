import { DeckGrid } from 'components/DeckGrid'
import { prisma } from 'data_utils'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import Head from 'next/head'
import styled from 'styled-components'
import { DeckWithHandle, User } from 'types'
import { pluralizer } from 'utils'

interface Props {
  user: User | null
  error?: string
  decks: DeckWithHandle[]
}

export const getStaticProps: GetStaticProps<Props> = async (context) => {
  const handle = context.params?.handle as string

  try {
    const user = await prisma.user.findUnique({ where: { handle: handle } })
    let decks: DeckWithHandle[] = []
    const error = user ? undefined : "Couldn't find a user with that handle"

    if (user) {
      decks = await prisma.deck.findMany({
        where: { creatorId: user.id },
        include: { creator: { select: { handle: true } } },
      })
    }

    return {
      props: {
        user,
        decks,
        error,
      },
    }
  } catch (err) {
    console.error(err)
    return {
      props: {
        user: null,
        decks: [],
        error: 'Error fetching user',
      },
    }
  }
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  }
}

function UserPage({
  user,
  decks,
  error,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  let title = 'Loading...'
  let meta = <p>Loading...</p>

  if (error) {
    title = 'Oh no!'
    meta = <p>{error}</p>
  }

  if (user) {
    title = user.handle
    meta = (
      <DeckMeta>
        <TitleBar>
          <h1>{user.handle}</h1>
        </TitleBar>
        <p>{pluralizer('Deck', decks.length, true)}</p>
      </DeckMeta>
    )
  }

  return (
    <>
      <Head>
        <title>Sol Ring / {title}</title>
      </Head>
      {meta}
      <DeckGrid decks={decks} />
    </>
  )
}

export default UserPage

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
