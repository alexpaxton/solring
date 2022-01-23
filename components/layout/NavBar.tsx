import { colors, LinkButton } from 'components/ui'
import Link from 'next/link'
import { FC } from 'react'
import styled from 'styled-components'
import { useMe } from 'utils'

export const NavBar: FC = () => {
  const { me, isLoading, isError } = useMe()

  let actions = <LinkButton href="/api/auth/login">Login</LinkButton>

  if (isLoading) {
    actions = <span>Loading...</span>
  }

  if (isError) {
    actions = <LinkButton href="/api/auth/login">Login</LinkButton>
  }

  if (me) {
    actions = (
      <>
        <p>
          Logged in as <strong>{`@${me.handle}`}</strong>
        </p>
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
        <Link href="/gatherer">
          <button>Gatherer</button>
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
  background-color: ${colors.n1};
  color: ${colors.n7};
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
  text-transform: uppercase;
  margin-right: 16px;
`

const Actions = styled.div`
  display: flex;
  align-items: center;

  & > button,
  & > a {
    margin-left: 16px;
  }
`
