import { EditDeckButton } from 'components/EditDeckButton'
import { Username } from 'components/Username'
import { FC } from 'react'
import styled from 'styled-components'
import { DeckWithHandle } from 'types'

interface Props {
  deck: DeckWithHandle;
}

export const DeckViewer: FC<Props> = ({ deck }) => {
  return (
    <DeckMeta>
      <TitleBar>
        <h1>{deck.title}</h1>
        <EditDeckButton creatorId={deck.creatorId} deckId={deck.id} />
      </TitleBar>
      <p>
          Created by <Username>{deck.creator.handle}</Username>
      </p>
      <Description>{deck.description || 'No description'}</Description>
    </DeckMeta>
  )
}

const DeckMeta = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 60px;
  border-bottom: 1px solid #eee;
  margin-bottom: 60px;
`

const TitleBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const Description = styled.p`
  font-size: 13px;
  margin-top: 24px;
`

