import { BulkAddButton } from 'components/deck/editor/BulkAddButton'
import { SearchWidget } from 'components/deck/editor/SearchWidget'
import { LayoutModeToggle } from 'components/deck/LayoutModeToggle'
import { colors } from 'components/ui'
import { FC } from 'react'
import styled from 'styled-components'

export const EditorControlbar: FC = () => {
  return (
    <Container>
      <SearchWidget />
      <BulkAddButton />
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
