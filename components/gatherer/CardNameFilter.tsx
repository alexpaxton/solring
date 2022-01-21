import { useFilters } from 'components/gatherer/FiltersContext'
import { Input, InputGroup } from 'components/ui'
import { ChangeEvent, FC } from 'react'
import styled from 'styled-components'

export const CardNameFilter: FC = () => {
  const { cardName, dispatch } = useFilters()

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    dispatch({
      type: 'updateName',
      payload: { cardName: e.target.value },
    })
  }

  return (
    <BigInputGroup label="Card Name">
      <Input
        type="text"
        value={cardName}
        onChange={handleInputChange}
        placeholder="ex: counterspell"
        spellCheck={false}
      />
    </BigInputGroup>
  )
}

const BigInputGroup = styled(InputGroup)`
  flex: 1 0 0;
`
