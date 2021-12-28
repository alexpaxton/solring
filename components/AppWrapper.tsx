import { FC, ReactNode } from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import { useMe } from 'utils'
import { useRouter } from 'next/router'

const navExcludedRoutes = ['/user/pick-a-handle']

interface Props {
    children: ReactNode
}

export const AppWrapper: FC<Props> = ({children}) => {
  const { pathname } = useRouter()
  const { user, handle } = useMe()

  let actions = (
    <a href="/api/auth/login">Login</a>
  )

  if (user && handle) {
    actions = (
      <>
        <p>Logged in as {handle}</p>
        <Link href="/decks/create"><button type="button">Create Deck</button></Link>
        <a href="/api/auth/logout">Logout</a>
      </>
    )
  }

  const renderHeader = navExcludedRoutes.some(route => pathname.startsWith(route)) === false

  return (
    <App>
      {renderHeader && (
        <Header>
          <Left>
            <Link href="/">
              <Logo>Sol Ring</Logo>
            </Link>
            <Link href="/decks"><button>Decks</button></Link>
          </Left>
          <Actions>{actions}</Actions>
        </Header>
      )}
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

const Left = styled.div`
  display: flex;
  align-items: center;

  & > button {
    margin-left: 16px;
  }
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

  & > button,
  & > a {
    margin-left: 16px;
  }
`

const Main = styled.main`
  flex: 1 0 0;
  display: flex;
  flex-direction: column;
  padding: 30px;
  overflow: auto;
`