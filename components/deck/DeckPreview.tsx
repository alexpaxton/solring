import { DeckPreviewCurve } from 'components/deck/DeckPreviewCurve'
import { DeckPreviewGrid } from 'components/deck/DeckPreviewGrid'
import { DeckPreviewType } from 'components/deck/DeckPreviewType'
import { FC } from 'react'
import styled from 'styled-components'


export const DeckPreview: FC = () => {
  return (
    <Container>
      <DeckPreviewGrid />
      <DeckPreviewCurve />
      <DeckPreviewType />
    </Container>
  )
}

const Container = styled.div`
  flex: 1 0 0;
  overflow: auto;
`