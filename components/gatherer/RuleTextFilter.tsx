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

export const RuleTextFilter: FC = () => {
  const { ruleText, dispatch, active } = useFilters()

  function activateFilter() {
    dispatch({ type: 'updateActiveFilter', payload: { ruleText: true } })
  }

  function removeFilter() {
    dispatch({ type: 'updateActiveFilter', payload: { ruleText: false } })
  }

  if (!active.ruleText) {
    return (
      <FilterPill onClick={activateFilter}>
        <span>Rule Text</span>
      </FilterPill>
    )
  }

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    dispatch({
      type: 'updateRuleText',
      payload: { ruleText: e.target.value },
    })
  }

  return (
    <FilterBox>
      <span>Rule Text</span>
      <RoundInput
        type="text"
        value={ruleText}
        onChange={handleInputChange}
        placeholder='Use "" to match exact text'
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
