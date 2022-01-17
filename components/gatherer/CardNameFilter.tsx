import { Field } from 'components/gatherer/Field'
import { useFilters } from 'components/gatherer/FiltersContext'
import { Input } from 'components/gatherer/Inputs'
import {
  ChangeEvent, FC
} from 'react'
import styled from 'styled-components'

export const CardNameFilter: FC = () => {
  const {
    cardName, dispatch 
  } = useFilters()

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    dispatch({
      type: 'updateName',
      payload: { cardName: e.target.value } 
    })
  }

  return (
    <BigField label="Card Name">
      <Input type="text" value={cardName} onChange={handleInputChange} placeholder="ex: counterspell" />
    </BigField>
  )
}

const BigField = styled(Field)`
  flex: 1 0 0;
`
