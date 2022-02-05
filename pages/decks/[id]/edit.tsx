import { getSession } from '@auth0/nextjs-auth0'
import { Editor } from 'components/deck/editor/Editor'
import { prisma } from 'data_utils'
import { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import { DeckWithHandle } from 'types'

interface Props {
  deck?: DeckWithHandle
}

const EditDeckPage: NextPage<Props> = ({ deck }: Props) => {
  let title = 'Loading...'
  let body = <p>Loading...</p>

  if (deck) {
    title = `Editing ${deck.title}`
    body = <Editor deck={deck} />
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

export const getServerSideProps: GetServerSideProps<Props> = async ({
  params,
  req,
  res,
}) => {
  const id = params?.id as string
  // Calling getSession will cause a warning in a dev environment:
  // https://github.com/auth0/nextjs-auth0/issues/524
  const session = await getSession(req, res)

  if (!id) {
    return { notFound: true }
  }

  const deck = await prisma.deck.findUnique({
    where: { id: id },
    include: { creator: { select: { handle: true } } },
  })

  if (!deck) {
    return { notFound: true }
  }

  if (!session) {
    return {
      redirect: { destination: `/decks/${deck.id}` },
      props: {},
    }
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  })

  if (user && user.id === deck.creatorId) {
    return { props: { deck } }
  }

  return {
    redirect: { destination: `/decks/${deck.id}` },
    props: {},
  }
}

export default EditDeckPage
