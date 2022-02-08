import {
  Check,
  ErrorCircle,
  QuestionMark,
} from '@styled-icons/boxicons-regular'
import { useCards } from 'components/deck/CardsContext'
import { colors } from 'components/ui'
import { FC } from 'react'
import { Card } from 'scryfall-sdk'
import styled from 'styled-components'

interface Props {
  searchList: string[]
  foundList: Card[]
}

export const BulkAddPreview: FC<Props> = ({ searchList, foundList }) => {
  const { isCardInDeck } = useCards()

  return (
    <List>
      {searchList.map((card) => {
        let className = 'not-found'
        let text = 'Not found'
        let icon = <IconNotFound />

        if (foundList.find((c) => c.name === card)) {
          className = 'add'
          text = ''
          icon = <IconAdd />
        }
        if (isCardInDeck(card)) {
          className = 'reject'
          text = 'Already in deck'
          icon = <IconReject />
        }

        return (
          <li key={`found-${card}`} className={className}>
            {icon}
            <strong>{card}</strong>
            <span>{text}</span>
          </li>
        )
      })}
    </List>
  )
}

const List = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  padding: 4px;
  margin: 0;
  list-style: none;
  width: 100%;
  border-radius: 6px;
  background-color: ${colors.n0};
  border: 2px solid ${colors.n2};
  height: 500px;
  overflow-x: hidden;
  overflow-y: auto;

  li {
    font-size: 15px;
    display: flex;
    align-items: center;
    padding: 8px 12px;
    border-radius: 4px;
    margin-bottom: 2px;

    &:last-child {
      margin-bottom: 0;
    }

    svg {
      width: 1em;
      height: 1em;
      font-size: 18px;
      display: inline-block;
      margin-right: 8px;
    }

    strong {
      font-weight: 500;
    }

    span {
      font-size: 12px;
      text-transform: uppercase;
      font-style: normal;
    }

    &.add {
      color: ${colors.n7};
      background-color: ${colors.n2};
    }

    &.reject,
    &.not-found {
      color: ${colors.n3};
      font-style: italic;
    }

    strong {
      flex: 1 0 0;
    }
  }
`

const IconAdd = styled(Check)`
  fill: ${colors.g2};
`

const IconReject = styled(ErrorCircle)`
  fill: ${colors.r2};
`

const IconNotFound = styled(QuestionMark)`
  fill: ${colors.n5};
`
