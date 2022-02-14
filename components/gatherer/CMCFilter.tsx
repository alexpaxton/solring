import {
  FilterBox,
  FilterPill,
  FilterX,
} from 'components/gatherer/FilterElements'
import { Input, Select } from 'components/ui'
import { useFilters } from 'contexts'
import { ChangeEvent, FC } from 'react'
import styled from 'styled-components'
import { X } from 'styled-icons/boxicons-regular'
import { CMCMode } from 'types'

export const CMCFilter: FC = () => {
  const { cmc, cmcAlt, cmcMode, dispatch, active } = useFilters()

  function activateFilter() {
    dispatch({ type: 'updateActiveFilter', payload: { cmc: true } })
  }

  function removeFilter() {
    dispatch({ type: 'updateActiveFilter', payload: { cmc: false } })
  }

  if (!active.cmc) {
    return (
      <FilterPill onClick={activateFilter}>
        <span>CMC</span>
      </FilterPill>
    )
  }

  function handleModeChange(e: ChangeEvent<HTMLSelectElement>) {
    const mode = e.target.value as CMCMode

    if (mode === 'between') {
      dispatch({
        type: 'updateCMC',
        payload: {
          cmcMode: mode,
          cmc: 0,
          cmcAlt: 5,
        },
      })
    } else {
      dispatch({
        type: 'updateCMC',
        payload: { cmcMode: mode },
      })
    }
  }

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    const value = parseInt(e.target.value) || 0

    if (e.target.name === 'first') {
      dispatch({
        type: 'updateCMC',
        payload: { cmc: value },
      })
    } else {
      dispatch({
        type: 'updateCMC',
        payload: { cmcAlt: value },
      })
    }
  }

  return (
    <FilterBox>
      <span>CMC</span>
      <Select value={cmcMode} onChange={handleModeChange}>
        <option value="exactly">Exactly</option>
        <option value="atLeast">At Least</option>
        <option value="atMost">At Most</option>
        <option value="between">Between</option>
      </Select>
      <SmallInput
        min={0}
        type="number"
        name="first"
        value={cmc}
        onChange={handleInputChange}
      />
      {cmcMode === 'between' && (
        <SmallInput
          min={0}
          type="number"
          name="second"
          value={cmcAlt}
          onChange={handleInputChange}
        />
      )}
      <FilterX type="button" onClick={removeFilter}>
        <X />
      </FilterX>
    </FilterBox>
  )
}

const SmallInput = styled(Input)`
  width: 60px;
`
