import { GetStaticProps, InferGetStaticPropsType } from 'next'
import Head from 'next/head'
import { User } from 'types'
import { prisma } from 'utils/prisma'
import { stringifyUserTimestamps } from 'utils'
import styled from 'styled-components'

interface Props {
  user?: User;
}

export const getStaticProps: GetStaticProps<Props> = async (context) => {
  const handle = context.params?.handle as string

  try {
    const prismaUser = await prisma.user.findUnique({where: {handle: handle}})
    if (!prismaUser) {
      throw new Error('Can\'t find user with that handle')
    }

    const user = stringifyUserTimestamps(prismaUser)

    return {
      props: { user },
    }
  } catch (err) {
    console.error(err)
    return { props: { user: undefined } }
  }
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  }
}

function UserPage({ user }: InferGetStaticPropsType<typeof getStaticProps>) {
  let title = 'Loading...'
  let body = <p>Loading...</p>

  if (user) {
    title = user.handle
    body = (
      <DeckMeta>
        <TitleBar>
          <h1>{user.handle}</h1>
        </TitleBar>
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

