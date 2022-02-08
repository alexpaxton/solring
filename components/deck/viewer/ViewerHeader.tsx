import { Header } from 'components/deck/DeckElements'
import { EditDeckButton } from 'components/deck/viewer/EditDeckButton'
import { useDeckViewer } from 'components/deck/viewer/ViewerContext'
import { colors } from 'components/ui'
import { Username } from 'components/Username'
import { FC } from 'react'
import styled from 'styled-components'

export const ViewerHeader: FC = () => {
  const { title, creatorHandle } = useDeckViewer()

  return (
    <StyledHeader>
      <div>
        <DeckTitle>{title}</DeckTitle>
        <Author>
          Creator: <Username>{creatorHandle}</Username>
        </Author>
      </div>
      <EditDeckButton />
    </StyledHeader>
  )
}

const StyledHeader = styled(Header)`
  justify-content: space-between;
  align-items: center;

  > div {
    display: inherit;
    align-items: center;
  }
`

const DeckTitle = styled.h1`
  margin: 0 24px 0 0;
  font-size: 24px;
  font-weight: 300;
  color: ${colors.n6};
`

const Author = styled.p`
  margin: 0;
`
