import { LayoutModeToggle } from 'components/deck/LayoutModeToggle'
import { colors } from 'components/ui'
import { FC } from 'react'
import styled from 'styled-components'

export const ViewerControlBar: FC = () => {
  return (
    <Container>
      <LayoutModeToggle />
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 18px 30px;
  border-bottom: 2px solid ${colors.n1};

  > * {
    margin-right: 16px;
  }

  > *:last-child {
    margin-right: 0;
  }
`
