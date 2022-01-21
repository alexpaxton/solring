import { useFilters } from 'components/gatherer/FiltersContext'
import { Toggle } from 'components/gatherer/Toggle'
import { InputGroup, Select } from 'components/ui'
import { ChangeEvent, FC } from 'react'
import styled from 'styled-components'
import { ColorMode } from 'types'

export const ColorFilter: FC = () => {
  const { colors, dispatch, colorMode } = useFilters()

  function handleColorToggle(color: string, active: boolean) {
    if (active) {
      dispatch({
        type: 'updateColors',
        payload: { colors: [...colors, color] },
      })
    } else {
      const updatedColors = colors.filter((c) => c !== color)
      dispatch({
        type: 'updateColors',
        payload: { colors: updatedColors },
      })
    }
  }

  function handleModeChange(e: ChangeEvent<HTMLSelectElement>) {
    const mode = e.target.value as ColorMode

    dispatch({
      type: 'updateColorMode',
      payload: { colorMode: mode },
    })
  }

  return (
    <StyledInputGroup label="Color">
      <ModeSelect value={colorMode} onChange={handleModeChange}>
        <option value="include">Include</option>
        <option value="exclude">Exclude</option>
        <option value="exactly">Exactly</option>
      </ModeSelect>
      <Toggle
        active={colors.includes('w')}
        onToggle={(active) => handleColorToggle('w', active)}
        color="w"
      />
      <Toggle
        active={colors.includes('u')}
        onToggle={(active) => handleColorToggle('u', active)}
        color="u"
      />
      <Toggle
        active={colors.includes('b')}
        onToggle={(active) => handleColorToggle('b', active)}
        color="b"
      />
      <Toggle
        active={colors.includes('r')}
        onToggle={(active) => handleColorToggle('r', active)}
        color="r"
      />
      <Toggle
        active={colors.includes('g')}
        onToggle={(active) => handleColorToggle('g', active)}
        color="g"
      />
    </StyledInputGroup>
  )
}

const ModeSelect = styled(Select)`
  margin-right: 8px;
`

const StyledInputGroup = styled(InputGroup)`
  padding-right: 8px;
`
