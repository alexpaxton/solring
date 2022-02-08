import { ControlBar } from 'components/deck/DeckElements'
import { LayoutModeToggle } from 'components/deck/LayoutModeToggle'
import { FC } from 'react'
import styled from 'styled-components'

export const ViewerControlBar: FC = () => {
  return (
    <StyledControlBar>
      <LayoutModeToggle />
    </StyledControlBar>
  )
}

const StyledControlBar = styled(ControlBar)`
  justify-content: space-between;
`
