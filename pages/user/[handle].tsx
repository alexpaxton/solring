import { Deck, User } from 'types'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import { addHandleToDeck, prisma } from 'data_utils'
import { stringifyDecksTimestamps, stringifyUserTimestamps } from 'utils'
import { DeckGrid } from 'components/DeckGrid'
import Head from 'next/head'
import { pluralizer } from 'utils'
import styled from 'styled-components'

interface Props {
  user?: User;
  decks: Deck[]
}

export const getStaticProps: GetStaticProps<Props> = async (context) => {
  const handle = context.params?.handle as string

  try {
    const prismaUser = await prisma.user.findUnique({where: {handle: handle}})
    if (!prismaUser) {
      throw new Error('Can\'t find user with that handle')
    }

    const user = stringifyUserTimestamps(prismaUser)
    const prismaDecks = await prisma.deck.findMany({where: {creatorId: user.id}})

    const cleanedDecks = stringifyDecksTimestamps(prismaDecks)

    const decks = await Promise.all(cleanedDecks.map(addHandleToDeck))

    return {
      props: { user, decks },
    }
  } catch (err) {
    console.error(err)
    return { props: { user: undefined, decks: [] } }
  }
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  }
}

function UserPage({ user, decks }: InferGetStaticPropsType<typeof getStaticProps>) {
  let title = 'Loading...'
  let meta = <p>Loading...</p>

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

