import { FC, useEffect } from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import { useMe } from 'utils'


export const NavBar: FC = () => {
  const { user, handle, forceRefresh } = useMe()

  useEffect(() => {
    forceRefresh()
  }, [])

  let actions = <a href="/api/auth/login">Login</a>

  if (user && handle) {
    actions = (
      <>
        <p>Logged in as {handle}</p>
        <Link href="/decks/create">
          <button type="button">Create Deck</button>
        </Link>
        <a href="/api/auth/logout">Logout</a>
      </>
    )
  }

  return (
    <Header>
      <Left>
        <Link href="/">
          <Logo>Sol Ring</Logo>
        </Link>
        <Link href="/decks">
          <button>Decks</button>
        </Link>
      </Left>
      <Actions>{actions}</Actions>
    </Header>
  )
}

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
