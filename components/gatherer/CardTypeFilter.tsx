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

export const CardTypeFilter: FC = () => {
  const { cardType, dispatch, active } = useFilters()

  function activateFilter() {
    dispatch({ type: 'updateActiveFilter', payload: { cardType: true } })
  }

  function removeFilter() {
    dispatch({ type: 'updateActiveFilter', payload: { cardType: false } })
  }

  if (!active.cardType) {
    return (
      <FilterPill onClick={activateFilter}>
        <span>Type</span>
      </FilterPill>
    )
  }

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    dispatch({
      type: 'updateType',
      payload: { cardType: e.target.value },
    })
  }

  return (
    <FilterBox>
      <span>Type</span>
      <RoundInput
        type="text"
        value={cardType}
        onChange={handleInputChange}
        placeholder="ex: enchantment"
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
