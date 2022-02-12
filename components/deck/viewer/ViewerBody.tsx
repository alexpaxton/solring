import { useCards } from 'components/deck/CardsContext'
import { Layout } from 'components/deck/Layout'
import { List } from 'components/deck/List'
import { ViewerCard } from 'components/deck/viewer/ViewerCard'
import { useLayoutMode } from 'contexts'
import { FC } from 'react'
import styled from 'styled-components'

export const ViewerBody: FC = () => {
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
    return <List cards={cards} mode={mode} />
  }

  if (display === 'grid') {
    return (
      <Layout cards={cards} mode={mode}>
        {(items) =>
          items.map((item) => <ViewerCard key={item.card.id} {...item} />)
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
