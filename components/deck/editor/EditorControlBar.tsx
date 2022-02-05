import { BulkAddButton } from 'components/deck/editor/BulkAddButton'
import { SearchWidget } from 'components/deck/editor/SearchWidget'
import { colors } from 'components/ui'
import { FC } from 'react'
import styled from 'styled-components'

export const EditorControlbar: FC = () => {
  return (
    <Container>
      <SearchWidget />
      <BulkAddButton />
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 30px;
  border-bottom: 2px solid ${colors.n1};
`
