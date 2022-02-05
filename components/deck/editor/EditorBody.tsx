import { useCards } from 'components/deck/editor/CardsContext'
import { EditorCard } from 'components/deck/editor/EditorCard'
import { Layout } from 'components/deck/Layout'
import { FC } from 'react'
import styled from 'styled-components'
import { LayoutMode } from 'types'

interface Props {
  mode: LayoutMode
}

export const EditorBody: FC<Props> = ({ mode }) => {
  const { cards, loading } = useCards()

  if (loading) {
    return (
      <Loading>
        <p>Loading...</p>
      </Loading>
    )
  }

  return (
    <Layout cards={cards} mode={mode}>
      {(items) =>
        items.map((item) => (
          <EditorCard key={item.card.id} card={item.card} {...item.pos} />
        ))
      }
    </Layout>
  )
}

const Loading = styled.div`
  flex: 1 0 0;
  width: 100%;
  padding: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
`
