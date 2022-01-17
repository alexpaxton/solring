import { Field } from 'components/gatherer/Field'
import { useFilters } from 'components/gatherer/FiltersContext'
import { Input } from 'components/gatherer/Inputs'
import { ChangeEvent, FC } from 'react'
import styled from 'styled-components'

export const RuleTextFilter: FC = () => {
  const { ruleText, dispatch } = useFilters()

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    dispatch({
      type: 'updateRuleText',
      payload: { ruleText: e.target.value },
    })
  }

  return (
    <BigField label="Rule Text">
      <Input type="text" value={ruleText} onChange={handleInputChange} />
    </BigField>
  )
}

const BigField = styled(Field)`
  flex: 1 0 0;
`
