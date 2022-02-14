import {
  FilterBox,
  FilterPill,
  FilterX,
} from 'components/gatherer/FilterElements'
import { Input } from 'components/ui'
import { useFilters } from 'contexts'
import { ChangeEvent, FC } from 'react'
import styled from 'styled-components'
import { X } from 'styled-icons/boxicons-regular'

export const CardNameFilter: FC = () => {
  const { cardName, dispatch, active } = useFilters()

  function activateFilter() {
    dispatch({ type: 'updateActiveFilter', payload: { cardName: true } })
  }

  function removeFilter() {
    dispatch({ type: 'updateActiveFilter', payload: { cardName: false } })
  }

  if (!active.cardName) {
    return (
      <FilterPill onClick={activateFilter}>
        <span>Name</span>
      </FilterPill>
    )
  }

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    dispatch({
      type: 'updateName',
      payload: { cardName: e.target.value },
    })
  }

  return (
    <FilterBox>
      <span>Name</span>
      <RoundInput
        type="text"
        value={cardName}
        onChange={handleInputChange}
        placeholder="ex: elf"
        spellCheck={false}
      />
      <FilterX type="button" onClick={removeFilter}>
        <X />
      </FilterX>
    </FilterBox>
  )
}

const RoundInput = styled(Input)`
  border-radius: 16px;
  margin-left: -2px;
`
