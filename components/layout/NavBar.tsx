import { CreateDeckButton } from 'components/CreateDeckButton'
import { Button, colors } from 'components/ui'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FC } from 'react'
import styled from 'styled-components'
import { useMe } from 'utils'

export const NavBar: FC = () => {
  const { me, isLoading, isError } = useMe()
  const { asPath } = useRouter()

  function getUrl(url: string) {
    return asPath === '/' ? url : `${url}?returnTo=${asPath}`
  }

  let actions = (
    <Button href={getUrl('/api/auth/login')} as="a" variant="neutral">
      Login
    </Button>
  )

  if (isLoading) {
    actions = <span>Loading...</span>
  }

  if (isError) {
    actions = (
      <Button href={getUrl('/api/auth/login')} as="a" variant="neutral">
        Login
      </Button>
    )
  }

  if (me) {
    actions = (
      <>
        <p>
          Logged in as <strong>{`@${me.handle}`}</strong>
        </p>
        <Button href={getUrl('/api/auth/logout')} as="a" variant="primary">
          Logout
        </Button>
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
          <Button as="a" variant="neutral">
            Decks
          </Button>
        </Link>
        <Link href="/gatherer">
          <Button as="a" variant="neutral">
            Gatherer
          </Button>
        </Link>
        <CreateDeckButton />
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

  & > button,
  & > a {
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
