import { NavBar } from 'components/NavBar'
import { useRouter } from 'next/router'
import {
  FC, ReactNode
} from 'react'
import styled from 'styled-components'

const navExcludedRoutes = [ '/register/pick-a-handle' ]

interface Props {
    children: ReactNode
}

export const AppWrapper: FC<Props> = ({ children }) => {
  const { pathname } = useRouter()

  const renderHeader = navExcludedRoutes.some(
    route => pathname.startsWith(route)
  ) === false

  return (
    <App>
      {renderHeader && (
        <NavBar />
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

const Main = styled.main`
  flex: 1 0 0;
  display: flex;
  flex-direction: column;
`