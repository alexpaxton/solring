import { DeckEditor } from 'components/deck/DeckEditor'
import { DeckViewer } from 'components/deck/DeckViewer'
import { prisma } from 'data_utils'
import {
  GetStaticProps, InferGetStaticPropsType
} from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { DeckWithHandle } from 'types'
import { useMe } from 'utils'

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
  const { user } = useMe()
  const { push } = useRouter()

  useEffect(() => {
    if (deck && !user) {
      push(`/decks/${deck.id}`)
    }
  }, [ deck, user ])

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

  if (!user && deck) {
    title = `${deck.title}`
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

export default EditDeckPage
