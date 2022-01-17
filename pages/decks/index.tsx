import { DeckGrid } from 'components/DeckGrid'
import { prisma } from 'data_utils'
import { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import { FC } from 'react'
import styled from 'styled-components'
import { SWRConfig } from 'swr'
import { DeckWithHandle } from 'types'
import { pluralizer, useDecksWithHandles } from 'utils'

interface Props {
  fallback: {
    '/api/decks/all': DeckWithHandle[]
  }
}

const DecksIndexGrid: FC = () => {
  const { decks, isError, isLoading } = useDecksWithHandles()

  if (isLoading) {
    return <p>Loading...</p>
  }

  if (isError) {
    return <p>Error fetching decks</p>
  }

  if (!decks || !decks.length) {
    return <p>No decks exist yet</p>
  }

  return (
    <>
      <p>{`${decks.length} ${pluralizer('Deck', decks.length)}`}</p>
      <DeckGrid decks={decks} />
    </>
  )
}

const DecksIndex: NextPage<Props> = ({ fallback }: Props) => {
  return (
    <SWRConfig value={{ fallback }}>
      <DecksPage>
        <Head>
          <title>Sol Ring / Decks</title>
        </Head>
        <DecksIndexGrid />
      </DecksPage>
    </SWRConfig>
  )
}

export default DecksIndex

export const getStaticProps: GetStaticProps<Props> = async () => {
  const decks = await prisma.deck.findMany({
    orderBy: { title: 'asc' },
    include: { creator: { select: { handle: true } } },
  })

  return { props: { fallback: { '/api/decks/all': decks } } }
}

const DecksPage = styled.div`
  padding: 30px;
  flex: 1 0 0;
  width: 100%;
  overflow: auto;

  > p {
    margin-bottom: 30px;
  }
`
