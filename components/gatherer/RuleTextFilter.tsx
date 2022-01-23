import { Input, InputGroup } from 'components/ui'
import { useFilters } from 'contexts'
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
    <BigInputGroup label="Rule Text">
      <Input
        type="text"
        value={ruleText}
        onChange={handleInputChange}
        placeholder='Use "" to match exact text'
        spellCheck={false}
      />
    </BigInputGroup>
  )
}

const BigInputGroup = styled(InputGroup)`
  flex: 1 0 0;
`
