import { Button, colors } from 'components/ui'
import { FC } from 'react'
import styled from 'styled-components'
import { pluralizer } from 'utils'

interface Props {
  disableSearch: boolean
  onSearch: () => void
  onReset: () => void
  mode: 'none' | 'fetching' | 'done'
  validCardsCount: number
}

export const BulkAddControlBar: FC<Props> = ({
  onSearch,
  onReset,
  mode,
  disableSearch,
  validCardsCount,
}) => {
  let text = 'Enter cards below:'
  if (mode === 'fetching') {
    text = 'Finding cards...'
  }

  if (mode === 'done') {
    text = `${pluralizer('card', validCardsCount, true)} can be added:`
  }

  const showSearchButton = mode === 'none' || mode === 'fetching'
  const showResetButton = mode === 'done'

  return (
    <ControlBar>
      <span>{text}</span>
      {showSearchButton && (
        <Button onClick={onSearch} disabled={disableSearch} variant="primary">
          Search
        </Button>
      )}
      {showResetButton && (
        <Button onClick={onReset} variant="neutral">
          Go back
        </Button>
      )}
    </ControlBar>
  )
}

const ControlBar = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
  color: ${colors.n4};
`
