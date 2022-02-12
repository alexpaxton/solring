import { useCards } from 'components/deck/CardsContext'
import { EditorCard } from 'components/deck/editor/EditorCard'
import { Layout } from 'components/deck/Layout'
import { useLayoutMode } from 'contexts'
import { FC } from 'react'
import styled from 'styled-components'

export const EditorBody: FC = () => {
  const { cards, loading } = useCards()
  const { mode, display } = useLayoutMode()

  if (loading) {
    return (
      <Loading>
        <p>Loading...</p>
      </Loading>
    )
  }

  if (display === 'list') {
    return <p>BOOP</p>
  }

  if (display === 'grid') {
    return (
      <Layout cards={cards} mode={mode}>
        {(items) =>
          items.map((item) => <EditorCard key={item.card.id} {...item} />)
        }
      </Layout>
    )
  }

  return null
}

const Loading = styled.div`
  flex: 1 0 0;
  width: 100%;
  padding: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
`
