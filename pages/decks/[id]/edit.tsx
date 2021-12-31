import { DeckEditor } from 'components/deck/DeckEditor'
import { prisma } from 'data_utils'
import {
  GetStaticProps, InferGetStaticPropsType
} from 'next'
import Head from 'next/head'
import { DeckWithHandle } from 'types'

interface Props {
  deck: DeckWithHandle | null;
  error?: string;
}

export const getStaticProps: GetStaticProps<Props> = async (context) => {
  const id = context.params?.id as string

  try {
    const deck = await prisma.deck.findUnique({
      where: { id: id },
      include: { creator: { select: { handle: true, } } } 
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

function EditDeckPage({
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
    title = `Editing ${deck.title}`
    body = (
      <DeckEditor deck={deck} />
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

export default EditDeckPage
