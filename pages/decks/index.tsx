import { getDecks } from 'apiHelpers'
import { DeckGrid } from 'components/DeckGrid'
import { prisma } from 'data_utils'
import { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import { FC } from 'react'
import styled from 'styled-components'
import { SWRConfig } from 'swr'
import { DeckWithHandle } from 'types'
import { pluralizer } from 'utils'

interface Props {
  fallback: {
    '/api/deck': { data: DeckWithHandle[] }
  }
}

const DecksIndexGrid: FC = () => {
  const { data, error } = getDecks()

  if (!data && !error) {
    return <p>Loading...</p>
  }

  if (error) {
    return <p>{error}</p>
  }

  if (data === undefined || data.length === 0) {
    return <p>No decks exist yet</p>
  }

  return (
    <>
      <p>{`${data.length} ${pluralizer('Deck', data.length)}`}</p>
      <DeckGrid decks={data} />
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

  return { props: { fallback: { '/api/deck': { data: decks } } } }
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
