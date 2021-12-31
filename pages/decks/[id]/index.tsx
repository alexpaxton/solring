import { DeckViewer } from 'components/deck/DeckViewer'
import { prisma } from 'data_utils'
import {
  GetStaticProps, NextPage
} from 'next'
import Head from 'next/head'
import { DeckWithHandle } from 'types'

interface Props {
  deck: DeckWithHandle | null;
}

const DeckPage: NextPage<Props> = ({ deck }: Props) => {
  let title = 'Loading...'
  let body = <p>Loading...</p>

  if (deck) {
    title = deck.title
    body = (
      <DeckViewer deck={deck} />
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

export const getStaticProps: GetStaticProps<Props> = async (context) => {
  const id = context.params?.id as string

  if (!id) {
    return { notFound: true, }
  }

  const deck = await prisma.deck.findUnique({
    where: { id: id },
    include: { creator: { select: { handle: true } } } 
  })

  if (!deck) {
    return { notFound: true, }
  }

  return { props: { deck } }
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  }
}

export default DeckPage
