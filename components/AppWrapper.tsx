import { FC, ReactNode } from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import { useUser } from '@auth0/nextjs-auth0'

interface Props {
    children: ReactNode
}

export const AppWrapper: FC<Props> = ({children}) => {
  const { user } = useUser()

  let actions = (
    <a href="/api/auth/login">Login</a>
  )

  if (user) {
    actions = (
      <>
        <p>Welcome {user.name}!</p>
        <Link href="/decks/create">Create Deck</Link>
        <a href="/api/auth/logout">Logout</a>
      </>
    )
  }

  return (
    <App>
      <Header>
        <Link href="/">
          <Logo>Sol Ring</Logo>
        </Link>
        <Actions>{actions}</Actions>
      </Header>
      <Main>{children}</Main>
    </App>
  )
}

const App = styled.div`
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    align-items: stretch;
`

const Header = styled.header`
    flex: 0 0 80px;
    display: flex;
    align-items: center;
    background-color: #ccc;
    padding: 0 30px;
    justify-content: space-between;
`

const Logo = styled.h1`
    font-size: 16px;
    font-weight: bold;
    margin: 0;
    line-height: 1em;
`

const Actions = styled.div`
    display: flex;
    align-items: center;
`

const Main = styled.main`
    display: flex;
`